import type { Key } from '@aedart/contracts/support';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { toParts } from './toParts.js';

/**
 * Check if a value exists at a given path on a target object.
 *
 * @param {object} target - The target object to check.
 * @param {Key} path - The key or path to check.
 *
 * @returns {boolean} `true` if a value exists at the given path, `false` otherwise.
 */
export function has(target: object, path: Key): boolean
{
    if (target === null || typeof target !== 'object') {
        return false;
    }

    const segments = toParts(path);
    const len = segments.length;
    if (len === 0) {
        return false;
    }

    let current: Record<PropertyKey, unknown> = target as Record<PropertyKey, unknown>;
    for (let i = 0; i < len; i++) {
        const key = segments[i];

        // Security check
        if (isKeyUnsafe(key)) {
            return false;
        }

        // If we aren't at the end, but the path is broken, it doesn't exist
        if (current === null || typeof current !== 'object' || !(key in current)) {
            return false;
        }

        current = current[key] as Record<PropertyKey, unknown>;
    }

    return true;
}
