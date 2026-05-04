import type { Key } from '@aedart/contracts/support';
import { isPropertyKey } from './isPropertyKey.js';

/**
 * Determine if a given value is a valid {@link Key}.
 *
 * A key is considered valid if it is either a single {@link PropertyKey},
 * or a non-empty array of {@link PropertyKey} values.
 *
 * @see {@link isPropertyKey}
 *
 * @param {unknown} key - The value to check.
 *
 * @returns {key is Key} `true` if the value is a valid `Key`, `false` otherwise.
 */
export function isKey(key: unknown): key is Key
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
