/**
 * Determine if value is "array-like".
 *
 * An array-like object is a non-null object that has a `length` property
 * which is a non-negative integer.
 *
 * @param {unknown} value
 *
 * @returns {boolean}
 */
export function isArrayLike(value: unknown): boolean
{
    // Values that are null or not objects/functions cannot be array-like
    if (value === null || value === undefined || typeof value === 'symbol') {
        return false;
    }

    // Functions are objects and have a .length (number of arguments),
    // but Lodash and standard JS conventions usually exclude them from "array-like".
    const type = typeof value;
    if (type === 'function') {
        return false;
    }

    // Primitives like strings have a .length, and are technically array-like.
    // If you want to include strings (like Lodash does), we check the length.
    const length = (value as { length: unknown; }).length;

    return typeof length === 'number'
        && length >= 0
        && length <= Number.MAX_SAFE_INTEGER
        && Number.isInteger(length);
}
