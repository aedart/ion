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
    
    const type: string = typeof value;
    const conditions: object = {
        'boolean': function(value: boolean): boolean {
            return !value;
        },
        'string': function(value: string): boolean {
            return value.length === 0;
        },
        'number': function(value: number): boolean {
            return value === 0 || isNaN(value);
        },
        'bigint': function(value: bigint): boolean {
            return value === 0n;
        },
        'object': function(value: object): boolean {
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
        }
    };

    const check = Reflect.get(conditions, type) ?? function(): boolean {
        return false;
    }

    return check(value);
}