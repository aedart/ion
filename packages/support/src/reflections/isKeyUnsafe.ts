import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";

/**
 * Determine if property key is unsafe
 * 
 * @see DANGEROUS_PROPERTIES
 * 
 * @param {PropertyKey} key
 * 
 * @returns {boolean}
 */
export function isKeyUnsafe(key: PropertyKey): boolean
{
    return DANGEROUS_PROPERTIES.includes(key);
}