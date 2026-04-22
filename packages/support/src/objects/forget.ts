import { Key } from '@aedart/contracts/support';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { toParts } from './toParts.js';

/**
 * Removes a value at a given path on a target object.
 *
 * @param {object} target
 * @param {Key} path
 *
 * @returns {boolean}
 */
export function forget(target: object, path: Key): boolean
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

        if (isKeyUnsafe(key)) {
            return false;
        }

        // If we are at the last segment, attempt to delete
        if (i === len - 1) {
            try {
                return delete current[key];
            } catch (e) {
                // Return false if property is non-configurable (strict mode)
                return false;
            }
        }

        // If path is broken before the end, the property is already "forgotten"
        if (current === null || typeof current !== 'object' || !(key in current)) {
            return true;
        }

        current = current[key];
    }

    // Fallback for safety, though the loop logic should cover all paths
    return true;
}
