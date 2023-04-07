import { isArguments } from "lodash-es";

/**
 * Determine if value is empty
 * 
 * @param {*} value
 * 
 * @returns {boolean}
 */
export function empty(value: any): boolean
{
    if (value === undefined || value === null) {
        return true;
    }
    
    if (value === false) {
        return true;
    }
    
    if (typeof value === 'string' && value.length === 0) {
        return true;
    }
    
    if (typeof value === 'number' && value === 0) {
        return true;
    }

    if ((Array.isArray(value) || ArrayBuffer.isView(value) || isArguments(value))
        && 'length' in value
        && value.length === 0
    ) {
        return true;
    }

    if ((value instanceof Map || value instanceof Set)
        && value.size === 0
    ) {
        return true;
    }
    
    if (typeof value === 'object' && value.constructor === Object && Object.keys(value).length === 0) {
        return true;
    }

    return false;
}