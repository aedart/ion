import { descTag } from './descTag.js';

/**
 * Determine if value is empty
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function empty(value: any): boolean
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
                return value.length === 0;
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
