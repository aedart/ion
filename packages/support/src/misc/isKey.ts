import type { Key } from "@aedart/contracts/support";
import { isPropertyKey } from "./isPropertyKey.js";

/**
 * Determine if given is a valid {@link Key}
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