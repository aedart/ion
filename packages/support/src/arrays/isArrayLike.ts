import { isArrayLike as _isArrayLike } from "lodash-es";

/**
 * Determine if value is "array-like".
 * (Alias for Lodash's [`isArrayLike`]{@link import('lodash').isArrayLike}) method.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array-like_objects
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects
 * 
 * @param {any} value
 * 
 * @return {boolean}
 */
export const isArrayLike = _isArrayLike;