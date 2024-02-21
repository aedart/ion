import { isArrayLike } from './isArrayLike';
import { isTypedArray } from './isTypedArray';

/**
 * Determine if value is "safe" array-like object
 *
 * **Note**: _In this context "safe" means that given object passes {@link isArrayLike},
 * but is not instance of a {@link String} object, nor is the object a [Typed Array]{@link isTypedArray}!_
 * 
 * @param {object} value
 *
 * @return {boolean}
 */
export function isSafeArrayLike(value: object): boolean
{
    return isArrayLike(value)
        && !(value instanceof String)
        && !isTypedArray(value);
}