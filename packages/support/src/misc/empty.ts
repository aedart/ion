import { descTag } from "./descTag";

/**
 * Determine if value is empty
 * 
 * @param {any} value
 * 
 * @returns {boolean}
 */
export function empty(
    value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    if (value === undefined || value === null) {
        return true;
    }

    switch (typeof value) {
        case 'boolean':
            return !value;
            
        case 'number':
            return value === 0 || isNaN(value);
            
        case 'bigint':
            return value === 0n;
            
        case 'string':
            return value.length === 0;
            
        case 'object':
            // Array or array like
            if (Array.isArray(value) || ArrayBuffer.isView(value) || descTag(value) === '[object Arguments]') {
                return 'length' in value && value.length === 0;
            }

            // Map / Set
            if (value instanceof Map || value instanceof Set) {
                return value.size === 0
            }

            // Native object
            return value.constructor === Object && Object.keys(value).length === 0;
            
        default:
            return false;
    }
}