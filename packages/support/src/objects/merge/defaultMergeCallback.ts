import {
    MergeCallback,
    MergeOptions,
    MergeSourceInfo,
    NextCallback,
} from '@aedart/contracts/support/objects';
import { CLONE } from '@aedart/contracts/support/objects';
import { isConcatSpreadable, isSafeArrayLike, merge as mergeArrays } from '../../arrays/index.js';
import { descTag } from '../../misc/descTag.js';
import { isWeakKind } from '../../reflections/isWeakKind.js';
import MergeError from '../exceptions/MergeError.js';
import { isCloneable } from '../isCloneable.js';
import { canCloneUsingStructuredClone } from './canCloneUsingStructuredClone.js';

/**
 * The default merge callback
 *
 * @type {MergeCallback}
 */
export const defaultMergeCallback: MergeCallback = function(
    target: MergeSourceInfo,
    next: NextCallback,
    options: Readonly<MergeOptions>,
): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    let { value } = target;
    const {
        result,
        key,
        source,
        sourceIndex,
        depth,
    } = target;

    const hasExisting: boolean = Reflect.has(result, key);

    // @ts-expect-error Existing value can be of any type here...
    const existingValue: unknown = result[key];

    // Cloneable Support
    if (
        options.clone !== false
        && value !== null
        && typeof value === 'object'
        && isCloneable(value)
    ) {
        const clone = value[CLONE]();

        if (clone === null || typeof clone !== 'object') {
            throw new MergeError(
                `Expected clone() method to return object, ${descTag(clone)} was returned`,
                {
                    cause: {
                        key,
                        source: value,
                        clone: clone,
                    },
                },
            );
        }

        value = clone;
    }

    const type: string = typeof value;

    switch (type) {
        // -------------------------------------------------------------------------------------------------------- //
        // Primitives
        case 'undefined':
            if (
                value === undefined
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
        case 'function':
            return value;

        // -------------------------------------------------------------------------------------------------------- //
        // Null, Arrays and Objects
        case 'object':
            if (value === null) {
                return value;
            }

            // 1. Arrays, and array-like...
            const isArray: boolean = Array.isArray(
                value,
            );
            if (isArray || isConcatSpreadable(value) || isSafeArrayLike(value)) {
                // If required to merge with existing value, if one exists...
                if (
                    options.mergeArrays === true
                    && hasExisting
                    && (isArray || Array.isArray(existingValue))
                ) {
                    // If either existing or new value is of the type array, merge values into
                    // a new array.
                    return mergeArrays()
                        .using(options.arrayMergeOptions)
                        .of(existingValue, value);
                } else if (isArray) {
                    // When not requested merged, just overwrite existing value with a new array,
                    // if new value is an array.
                    return mergeArrays()
                        .using(options.arrayMergeOptions)
                        .of(value);
                }

                // For concat spreadable objects or array-like objects, the "basic object" merge logic
                // will deal with them.
            }

            // 2. Standard Array handling (when mergeArrays is false)
            if (isArray) {
                return mergeArrays()
                    .using(options.arrayMergeOptions)
                    .of(value);
            }

            // 3. Cloneable / Native kinds
            if (canCloneUsingStructuredClone(value)) {
                return structuredClone(value);
            }

            // 4. Weak References
            if (isWeakKind(value)) {
                return value;
            }

            // 5. Basic Objects / Deep Recursion
            if (
                hasExisting
                && existingValue !== null
                && typeof existingValue === 'object'
                && !Array.isArray(existingValue)
            ) {
                return next([existingValue, value], options, depth + 1);
            }

            return next([Object.create(null), value], options, depth + 1);

        default:
            throw new MergeError(
                `Unable to merge value of type ${type} (${
                    descTag(value)
                }) at source index ${sourceIndex}`,
                {
                    cause: {
                        key,
                        value,
                        source,
                        sourceIndex,
                        depth,
                        options,
                    },
                },
            );
    }
};
