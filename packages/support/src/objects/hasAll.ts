import {has} from './has.js';
import type {Key} from "@aedart/contracts/support";

/**
 * Determine if all paths are properties of given object
 *
 * @template T
 *
 * @param {T} object Target object
 * @param {...Key} paths Property path(s)
 *
 * @returns {boolean}
 */
export function hasAll<T>(object: T, ...paths: Key[]): boolean
{
    if (object === undefined || paths.length === 0) {
        return false;
    }

    for (let i = 0, len = paths.length; i < len; i++) {
        if (!has(object, paths[i])) {
            return false;
        }
    }

    return true;
}
