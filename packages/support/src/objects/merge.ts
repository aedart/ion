import {
    MergeOptions,
    MergeCallback, DEFAULT_MERGE_SKIP_KEYS
} from "@aedart/contracts/support/objects";
import { isPrimitive, descTag } from "@aedart/support/misc";
import MergeError from "./exceptions/MergeError";

/**
 * Default merge options to be applied, when none are provided to {@link merge}
 * 
 * @type {MergeOptions}
 */
export const DEFAULT_MERGE_OPTIONS: MergeOptions = {
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
    // Resolve merge callback
    const callback: MergeCallback = (typeof options == 'function')
                                    ? options
                                    : defaultMergeCallback;
    
    // Resolve user provided merge options
    const userOptions: MergeOptions = (typeof options == 'object' && options !== null)
                                    ? options
                                    : Object.create(null)

    // Resolve the final options to use
    const resolved: MergeOptions = {
        ...DEFAULT_MERGE_OPTIONS,
        ...{
            callback: callback
        },
        ...userOptions
    };

    // Perform actual merge...
    try {
        return performMerge(sources, resolved);    
    } catch (error) {
        if (error instanceof MergeError) {
            error.cause.sources = sources;
            error.cause.options = resolved;
            
            throw error; 
        }
        
        throw new MergeError('Unable to merge objects', {
            cause: {
                error: error,
                sources: sources,
                options: resolved
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
 * @param {MergeOptions} options
 *
 * @returns {object}
 *
 * @throws {MergeError} If unable to merge objects
 */
function performMerge(sources: object[], options: MergeOptions): object
{
    return sources.reduce((result: object, current: object, index: number) => {
        if (Array.isArray(current)) {
            throw new MergeError(`Unable to merge object with an array source, (source index: ${index})`, {
                cause: {
                    current: current,
                    index: index
                }
            });
        }

        const keys: PropertyKey[] = Reflect.ownKeys(current);
        for (const key of keys){
            // Skip key if needed ...
            if (options.skip?.includes(key) === true) {
                continue;
            }

            // Resolve the value via callback and set it in resulting object.
            result[key] = options.callback(
                result,
                key,
                current[key],
                current,
                index,
                options
            );
        }

        return result;
    }, Object.create(null));
}

/**
 * Default merge callback
 * 
 * @param {object} result The final resulting object
 * @param {PropertyKey} key
 * @param {any} value
 * @param {object} source
 * @param {number} sourceIndex
 * @param {MergeOptions} options
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
    options: MergeOptions
): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    // Determine if an existing property exists, and its type...
    const exists: boolean = Reflect.has(result, key);
    const type: string = typeof value;

    // Primitives
    // @see https://developer.mozilla.org/en-US/docs/Glossary/Primitive
    if (isPrimitive(value)) {
        
        // Do not overwrite existing value with `undefined`, if options do not allow it...
        if (value === undefined && options.overwriteWithUndefined === false && exists && result[key] !== undefined) {
            return result[key];
        }
        
        // Otherwise, just return the value for primitive value.
        return value;
    }
    
    // Arrays
    if (Array.isArray(value)) {
        
        // Create a structured clone of array value. However, this can fail if array contains
        // complex values, e.g. functions, objects, ...etc.
        try {
            const clonedArray = structuredClone(value);

            // Merge array values if required.
            if (options.mergeArrays === true && exists && Array.isArray(result[key])) {
                return [ ...result[key], ...clonedArray ];
            }

            // Returns the cloned array, to avoid unintended manipulation...
            return clonedArray;
        } catch (error) {
            throw new MergeError(`Unable to merge array value at source index ${sourceIndex}`, {
                cause: {
                    error: error,
                    key: key,
                    value: value,
                    source: source,
                    sourceIndex: sourceIndex,
                    options: options
                }
            });
        }
    }
    // TODO: Array-Like objects ???

    // Functions are an exception to the copy rule. They must remain untouched...
    if (type == 'function') {
        return value;
    }
    
    // Objects
    if (type == 'object') {
        // Merge with existing, if not null...
        if (exists && typeof result[key] == 'object' && result[key] !== null) {
            return performMerge([ result[key], value ], options);
        }
        
        // Otherwise, create a new object and merge it.
        return performMerge([ {}, value ], options);
    }
    
    // If for some reason this point is reached, it means that we are unable to merge "something".
    throw new MergeError(`Unable to merge value of type ${type} (${descTag(value)}) at source index ${sourceIndex}`, {
        cause: {
            key: key,
            value: value,
            source: source,
            sourceIndex: sourceIndex,
            options: options
        }
    });
}

