import type { Key } from '@aedart/contracts/support';

/**
 * Resolves a key or path into individual parts.
 *
 * @param {Key} key - The key or path to resolve.
 *
 * @returns {PropertyKey[]} An array of individual path segments.
 */
export function toParts(key: Key): PropertyKey[]
{
    if (Array.isArray(key)) {
        return key;
    }

    if (typeof key === 'symbol') {
        return [key];
    }

    // Capture everything that isn't a dot or a bracket
    return String(key).match(/[^.[\]]+/g) ?? [];
}
