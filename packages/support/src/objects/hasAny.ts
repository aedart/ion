import type { Key } from '@aedart/contracts/support';
import { has } from './has.js';

/**
 * Determine if any of the given paths exist on a target object.
 *
 * @param {object} object - The target object to check.
 * @param {...Key} paths - The path(s) to check.
 *
 * @returns {boolean} `true` if at least one path exists, `false` otherwise.
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
