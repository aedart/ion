import { UNSAFE_PROPERTY_KEYS } from "@aedart/support/concerns/index";

/**
 * Determine if given property key is considered "unsafe"
 * 
 * @see UNSAFE_PROPERTY_KEYS
 * 
 * @param {PropertyKey} key
 * 
 * @returns {boolean}
 */
export function isUnsafeKey(key: PropertyKey): boolean
{
    return UNSAFE_PROPERTY_KEYS.includes(key);
}