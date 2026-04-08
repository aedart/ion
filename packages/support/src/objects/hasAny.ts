import {has} from './has.js';
import type {Key} from "@aedart/contracts/support";

/**
 * Determine if any paths are properties of given object
 *
 * @template T
 *
 * @param {T} object Target object
 * @param {...Key} paths Property path(s)
 *
 * @returns {boolean}
 */
export function hasAny<T>(object: T, ...paths: Key[]): boolean
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
