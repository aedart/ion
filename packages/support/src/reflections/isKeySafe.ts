import {isKeyUnsafe} from "@aedart/support/reflections/isKeyUnsafe";

/**
 * Opposite of {@link isKeyUnsafe}
 * 
 * @param {PropertyKey} key
 * 
 * @returns {boolean}
 */
export function isKeySafe(key: PropertyKey): boolean
{
    return !isKeyUnsafe(key);
}