import type { Key } from '@aedart/contracts/support';
import { has } from './has.js';

/**
 * Determine if any paths are properties of given object
 *
 * @param {object} object Target object
 * @param {...Key} paths Property path(s)
 *
 * @returns {boolean}
 */
export function hasAny(object: object, ...paths: Key[]): boolean
{
    const len = paths.length;
    if (object === undefined || len === 0) {
        return false;
    }

    for (let i = 0; i < len; i++) {
        if (has(object, paths[i])) {
            return true;
        }
    }

    return false;
}
