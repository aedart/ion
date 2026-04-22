import { Key } from '@aedart/contracts/support';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { toParts } from './toParts.js';

/**
 * Check if a value exists at a given path on a target object.
 *
 * @param {object} target
 * @param {Key} path
 *
 * @returns {boolean}
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

    let current: any = target;

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

        current = current[key];
    }

    return true;
}
