import { descTag } from './descTag.js';

/**
 * Determine if a value is considered empty.
 *
 * The following are considered empty:
 * - `undefined` or `null`
 * - `false`, empty string `""`
 * - `0` or `NaN`
 * - `0n`
 * - Arrays, TypedArrays, and `arguments` objects with a `length` of `0`
 * - `Map` or `Set` with a `size` of `0`
 * - Plain objects with no own enumerable properties
 *
 * @param {unknown} value - The value to check.
 *
 * @returns {boolean} `true` if the value is empty, `false` otherwise.
 */
export function empty(value: unknown): boolean
{
    if (value === undefined || value === null) {
        return true;
    }
    switch (typeof value) {
        case 'string':
        case 'boolean':
            return !value;
        case 'number':
            return value === 0 || Number.isNaN(value);
        case 'bigint':
            return value === 0n;
        case 'object':
            // Handle Arrays, TypedArrays, and Arguments object via length property
            if (
                Array.isArray(value) || ArrayBuffer.isView(value)
                || descTag(value) === '[object Arguments]'
            ) {
                return (value as { length: number; }).length === 0;
            }
            // Map / Set use .size
            if (value instanceof Map || value instanceof Set) {
                return value.size === 0;
            }
            // Plain objects: Using Object.keys is generally fastest for checking own-enumerable properties
            return value.constructor === Object && Object.keys(value).length === 0;
        default:
            return false;
    }
}
