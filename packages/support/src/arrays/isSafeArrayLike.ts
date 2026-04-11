import { isArrayLike } from './isArrayLike.js';
import { isTypedArray } from './isTypedArray.js';

/**
 * Determine if value is "safe" array-like object
 *
 * **Note**: _In this context "safe" means that given object passes {@link isArrayLike},
 * but value is:_
 *  - not a string.
 *  - not instance of a {@link String} object.
 *  - not a [Typed Array]{@link isTypedArray} object.
 * 
 * @param {any} value
 *
 * @return {boolean}
 */
export function isSafeArrayLike(value: any): boolean
{
    // 1. Cheapest checks first: exclude string primitives and boxed String objects.
    // 2. Perform isArrayLike to ensure it has a valid length property.
    // 3. Finally, exclude Typed Arrays.
    return typeof value !== 'string'
        && !(value instanceof String)
        && isArrayLike(value)
        && !isTypedArray(value);
}
