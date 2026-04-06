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
    // Handle the most common case first: a single property key
    if (!Array.isArray(key)) {
        return isPropertyKey(key);
    }

    const length = key.length;
    if (length === 0) {
        return false;
    }

    // Use a standard for-loop for maximum performance in V8
    for (let i = 0; i < length; i++) {
        if (!isPropertyKey(key[i])) {
            return false;
        }
    }

    return true;
}