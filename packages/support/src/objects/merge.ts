import type {
    MergeOptions,
    MergeCallback,
    SkipKeyCallback
} from "@aedart/contracts/support/objects";
import {
    DEFAULT_MAX_MERGE_DEPTH,
    DEFAULT_MERGE_SKIP_KEYS
} from "@aedart/contracts/support/objects";
import type { Constructor } from "@aedart/contracts";
import { descTag } from "@aedart/support/misc";
import {
    isArrayLike,
    isConcatSpreadable,
    isTypedArray,
    merge as mergeArrays
} from "@aedart/support/arrays";
import { getErrorMessage } from "@aedart/support/exceptions";
import { TYPED_ARRAY_PROTOTYPE } from "@aedart/contracts/support/reflections";
import MergeError from "./exceptions/MergeError";

/**
 * Default merge options to be applied, when none are provided to {@link merge}
 * 
 * @type {MergeOptions}
 */
export const DEFAULT_MERGE_OPTIONS: MergeOptions = {
    depth: DEFAULT_MAX_MERGE_DEPTH,
    skip: DEFAULT_MERGE_SKIP_KEYS,
    overwriteWithUndefined: true,
    mergeArrays: false,
};
Object.freeze(DEFAULT_MERGE_OPTIONS);

/**
 * Merge two or more objects
 * 
 * @param {object[]} sources
 * @param {MergeCallback|MergeOptions} [options] Merge callback or merge options. If merge options are given,
 *                                     then the `callback` setting is automatically set to {@link defaultMergeCallback}
 *                                     if not otherwise specified.  
 * 
 * @returns {object}
 * 
 * @throws {MergeError} If unable to merge objects
 */
export function merge(
    sources: object[],
    options?: MergeCallback | MergeOptions
): object
{
    // Resolve the merge options
    const resolved: Readonly<MergeOptions> = resolveOptions(options);
    
    // Perform actual merge...
    try {
        return performMerge(sources, resolved);    
    } catch (error) {
        if (error instanceof MergeError) {
            error.cause.sources = sources;
            error.cause.options = resolved;
            
            throw error; 
        }

        const reason: string = getErrorMessage(error);

        throw new MergeError(`Unable to merge objects: ${reason}`, {
            cause: {
                previous: error,
                sources: sources,
                options: resolved
            }
        });
    }
}


/**
 * Default merge callback
 * 
 * @param {object} result The resulting object (relative to object depth)
 * @param {PropertyKey} key Property Key in source object
 * @param {any} value Value of the property in source object
 * @param {object} source The source object that holds the property
 * @param {number} sourceIndex Source index (relative to object depth)
 * @param {number} depth Current depth
 * @param {Readonly<MergeOptions>} options
 * 
 * @returns {any} The value to be merged into the resulting object
 * 
 * @throws {MergeError} If unable to resolve value
 */
export const defaultMergeCallback: MergeCallback = function(
    result: object,
    key: PropertyKey,
    value: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    source: object,
    sourceIndex: number,
    depth: number,
    options: Readonly<MergeOptions>
): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    // Determine the type and resolve value based on it... 
    const type: string = typeof value;    

    switch (type) {

        // -------------------------------------------------------------------------------------------------------- //
        // Primitives
        // @see https://developer.mozilla.org/en-US/docs/Glossary/Primitive

        case 'undefined':
            // Do not overwrite existing value with `undefined`, if options do not allow it...
            if (value === undefined
                && options.overwriteWithUndefined === false
                && Reflect.has(result, key)
                && result[key] !== undefined
            ) {
                return result[key];
            }

            return value;
            
        case 'string':
        case 'number':
        case 'bigint':
        case 'boolean':
        case 'symbol':
            return value;

        // -------------------------------------------------------------------------------------------------------- //
        // Functions
            
        case 'function':
            return value;

        // -------------------------------------------------------------------------------------------------------- //
        // Null, Arrays and Objects
        case 'object':
            // Null (primitive) - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            if (value === null) {
                return value;
            }

            // Arrays - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            const isArray: boolean = Array.isArray(value);

            if (isArray || isConcatSpreadable(value) || isSafeArrayLike(value)) {

                // If required to merge with existing value, if one exists...
                if (options.mergeArrays === true
                    && Reflect.has(result, key)
                    && (isArray || Array.isArray(result[key]))
                ) {
                    // If either existing or new value is of the type array, merge values into
                    // a new array.
                    return mergeArrays(result[key], value);
                } else if (isArray) {
                    // When not requested merged, just overwrite existing value with a new array,
                    // if new value is an array.
                    return mergeArrays(value);
                }

                // For concat spreadable objects or array-like objects, the "basic object" merge logic
                // will deal with them.
            }

            // Objects (when cloneable) - - - - - - - - - - - - - - - - - - - - - - - - -
            // TODO: See what others do... perhaps an interface / Symbol
            
            // Objects (of "native" kind) - - - - - - - - - - - - - - - - - - - - - - - -
            // Clone the object of a "native" kind value, if supported.
            if (canCloneObjectValue(value)) {
                return structuredClone(value);
            }

            // Objects (WeakRef, WeakMap and WeakSet) - - - - - - - - - - - - - - - - - -
            // "Weak Reference" kind of objects cannot, nor should they, be cloned. 
            if (isWeakReferenceKind(value)) {
                return value;
            }

            // Objects (basic)- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // Merge with existing, if existing value is not null...
            if (Reflect.has(result, key)
                && typeof result[key] == 'object'
                && result[key] !== null
                && !(Array.isArray(result[key]))
            ) {
                return performMerge([ result[key], value ], options, depth + 1);
            }

            // Otherwise, create a new object and merge it.
            return performMerge([ Object.create(null), value ], options, depth + 1);
            
        // -------------------------------------------------------------------------------------------------------- //
        // If for some reason this point is reached, it means that we are unable to merge "something".
        default:
            throw new MergeError(`Unable to merge value of type ${type} (${descTag(value)}) at source index ${sourceIndex}`, {
                cause: {
                    key: key,
                    value: value,
                    source: source,
                    sourceIndex: sourceIndex,
                    depth: depth,
                    options: options
                }
            });
    }
}

/**
 * Performs merge of given objects
 *
 * @internal
 *
 * @param {object[]} sources
 * @param {Readonly<MergeOptions>} options
 * @param {number} [depth=0]
 *
 * @returns {object}
 *
 * @throws {MergeError} If unable to merge objects
 */
function performMerge(sources: object[], options: Readonly<MergeOptions>, depth: number = 0): object
{
    // Abort if maximum depth has been reached
    if (depth > options.depth) {
        throw new MergeError(`Maximum merge depth (${options.depth}) has been exceeded`, {
            cause: {
                source: sources,
                depth: depth
            }
        });
    }
 
    return sources.reduce((result: object, source: object, index: number) => {
        if (Array.isArray(source)) {
            throw new MergeError(`Unable to merge object with an array source, (source index: ${index})`, {
                cause: {
                    source: source,
                    index: index,
                    depth: depth
                }
            });
        }

        const keys: PropertyKey[] = Reflect.ownKeys(source);
        for (const key of keys){
            // Skip key if needed ...
            if ((options.skip as SkipKeyCallback)(key, source, result)) {
                continue;
            }

            // Resolve the value via callback and set it in resulting object.
            result[key] = options.callback(
                result,
                key,
                source[key],
                source,
                index,
                depth,
                options
            );
        }

        return result;
    }, Object.create(null));
}

/**
 * Determine if an object value can be cloned via `structuredClone()`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 *
 * @internal
 *
 * @param {object} value
 *
 * @return {boolean}
 */
function canCloneObjectValue(value: object): boolean
{
    const supported: Constructor[] = [
        // Array, // Handled by array, with evt. array value merges
        ArrayBuffer,
        Boolean,
        DataView,
        Date,
        Error,
        Map,
        Number,
        // Object, // Handled by "basic" objects merging...
        // (Primitive Types), // Also handled elsewhere...
        RegExp,
        Set,
        String,
        TYPED_ARRAY_PROTOTYPE
    ];

    for (const constructor of supported) {
        if (value instanceof constructor) {
            return true;
        }
    }

    return false;
}

/**
 * Determine if value is array-like, but not a String object or Typed Array
 * 
 * @internal
 * 
 * @param {object} value
 * 
 * @return {boolean}
 */
function isSafeArrayLike(value: object): boolean
{
    return isArrayLike(value)
        && !(value instanceof String) // String object handled by structured clone
        && !isTypedArray(value); // TypedArray object handled by structured clone
}

/**
 * Determine if object of a "weak reference" kind, e.g. `WeakRef`, `WeakMap` or `WeakSet`
 * 
 * @internal
 * 
 * @param {object} value
 * 
 * @return {boolean}
 */
function isWeakReferenceKind(value: object): boolean
{
    return value instanceof WeakRef
        || value instanceof WeakMap
        || value instanceof WeakSet
}

/**
 * Resolve the merge options
 * 
 * @internal
 * 
 * @param {MergeCallback | MergeOptions} [options]
 * 
 * @return {Readonly<MergeOptions>}
 * 
 * @throws {MergeError}
 */
function resolveOptions(options?: MergeCallback | MergeOptions): Readonly<MergeOptions>
{
    // Merge the default and user provided options...
    const resolved: MergeOptions = {
        // Use default options as a base.
        ...DEFAULT_MERGE_OPTIONS,

        // Resolve merge callback.
        ...{
            callback: (typeof options == 'function')
                ? options
                : defaultMergeCallback
        },

        // Resolve user provided merge options.
        ...(typeof options == 'object' && options !== null)
            ? options
            : Object.create(null)
    };

    // Abort in case of invalid maximum depth - other options can also be asserted, but they are less important.
    // The Browser / Node.js Engine will throw an error in case that they maximum recursion level is reached!
    if (typeof resolved.depth != 'number' || resolved.depth < 0) {
        throw new MergeError('Invalid maximum "depth" merge option value', {
            cause: {
                options: resolved
            }
        });
    }

    // Resolve the skip callback.
    if (Array.isArray(resolved.skip)) {
        resolved.skip = makeDefaultSkipCallback(resolved.skip);
    }

    // Freeze the resolved options to avoid strange behaviour, if user provides
    // custom merge callback and attempts to change the options...
    return Object.freeze(resolved);
}

/**
 * Returns a default "skip" callback, for given property keys
 *
 * @internal
 *
 * @param {PropertyKey[]} keys Properties that must not be merged
 *
 * @return {SkipKeyCallback}
 */
function makeDefaultSkipCallback(keys: PropertyKey[]): SkipKeyCallback
{
    return (
        key: PropertyKey,
        source: object,
        result: object /* eslint-disable-line @typescript-eslint/no-unused-vars */
    ) => {
        return keys.includes(key) && Reflect.has(source, key);
    }
}
