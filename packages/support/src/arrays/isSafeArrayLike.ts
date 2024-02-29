import { isArrayLike } from './isArrayLike';
import { isTypedArray } from './isTypedArray';

/**
 * Determine if value is "safe" array-like object
 *
 * **Note**: _In this context "safe" means that given object passes {@link isArrayLike},
 * but value is:_
 *  - not a string.
 *  - not instance of a {@link String} object.
 *  - not a [Typed Array]{@link isTypedArray} object.
 * 
 * @param {object} value
 *
 * @return {boolean}
 */
export function isSafeArrayLike(
    value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    return typeof value != 'string'
        && !(value instanceof String)
        && !isTypedArray(value)
        && isArrayLike(value);
}