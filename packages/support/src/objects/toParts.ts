import { Key } from '@aedart/contracts/support';

/**
 * Resolves a key or path into individual parts.
 *
 * @param {Key} key
 * @returns {string[]}
 */
export function toParts(key: Key): (PropertyKey)[]
{
    if (Array.isArray(key)) {
        return key;
    }

    if (typeof key === 'symbol') {
        return [key];
    }

    // Capture everything that isn't a dot or a bracket
    return String(key).match(/[^.[\]]+/g) || [];
}
