import { MergeCallback, MergeOptions, MergeSourceInfo, NextCallback } from "@aedart/contracts/support/objects";
import { isConcatSpreadable, isSafeArrayLike, merge as mergeArrays } from "@aedart/support/arrays";
import { canCloneUsingStructuredClone, MergeError } from "@aedart/support/objects";
import { isWeakKind } from "@aedart/support/reflections";
import { descTag } from "@aedart/support/misc";

/**
 * The default merge callback
 * 
 * @type {MergeCallback}
 */
export const defaultMergeCallback: MergeCallback = function(target: MergeSourceInfo, next: NextCallback, options: Readonly<MergeOptions>): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    const {
        result,
        key,
        value,
        source,
        sourceIndex,
        depth
    } = target;

    // Determine if result contains key
    const hasExisting: boolean = Reflect.has(result, key);

    // The existing value, if any
    // @ts-expect-error Existing value can be of any type here...
    const existingValue: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ = result[key];

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
                && hasExisting
                && existingValue !== undefined
            ) {
                return existingValue;
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
            const isArray: boolean = Array.isArray(value); /* eslint-disable-line no-case-declarations */

            if (isArray || isConcatSpreadable(value) || isSafeArrayLike(value)) {

                // If required to merge with existing value, if one exists...
                if (options.mergeArrays === true
                    && hasExisting
                    && (isArray || Array.isArray(existingValue))
                ) {
                    // If either existing or new value is of the type array, merge values into
                    // a new array.
                    return mergeArrays(existingValue, value);
                } else if (isArray) {
                    // When not requested merged, just overwrite existing value with a new array,
                    // if new value is an array.
                    return mergeArrays(value);
                }

                // For concat spreadable objects or array-like objects, the "basic object" merge logic
                // will deal with them.
            }

            // Objects (of "native" kind) - - - - - - - - - - - - - - - - - - - - - - - -
            // Clone the object of a "native" kind value, if supported.
            if (canCloneUsingStructuredClone(value)) {
                return structuredClone(value);
            }

            // Objects (WeakRef, WeakMap and WeakSet) - - - - - - - - - - - - - - - - - -
            // "Weak Reference" kind of objects cannot, nor should they, be cloned. 
            if (isWeakKind(value)) {
                return value;
            }

            // Objects (basic)- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // Merge with existing, if existing value is not null...
            if (hasExisting
                && typeof existingValue == 'object'
                && existingValue !== null
                && !(Array.isArray(existingValue))
            ) {
                return next([ existingValue, value ], options, depth + 1);
            }

            // Otherwise, create a new object and merge it.
            return next([ Object.create(null), value ], options, depth + 1);

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
};