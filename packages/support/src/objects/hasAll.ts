import type { Key } from '@aedart/contracts/support';
import { has } from './has.js';

/**
 * Determine if all paths are properties of given object
 *
 * @param {object} target Target object
 * @param {...Key} paths Property path(s)
 *
 * @returns {boolean}
 */
export function hasAll<T>(target: object, ...paths: Key[]): boolean
{
    if (target === undefined || paths.length === 0) {
        return false;
    }

    for (let i = 0, len = paths.length; i < len; i++) {
        if (!has(target, paths[i])) {
            return false;
        }
    }

    return true;
}
