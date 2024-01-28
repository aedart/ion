import { isPropertyKey } from "./isPropertyKey";

/**
 * Determine if given is a valid {@link import('@aedart/contracts/support').Key}
 * 
 * @see {isPropertyKey}
 * 
 * @param {any} key
 * 
 * @returns {boolean}
 */
export function isKey(key: any): boolean
{
    if (!Array.isArray(key)) {
        key = [ key ];
    }
    
    if (key.length === 0) {
        return false;
    }
    
    for (const entry of key) {
        if (!isPropertyKey(entry)) {
            return false;
        }
    }
    
    return true;
}