import { has } from './has';
import type {Key} from "@aedart/contracts/support";

/**
 * Determine if any paths are properties of given object
 * @template T
 *
 * @param {T} object Target object
 * @param {...Key} paths Property path(s)
 *
 * @returns {boolean}
 */
export function hasAny<T>(object: T, ...paths: (Key)[]): boolean
{
    for (const path of paths) {
        if (has(object, path)) {
            return true;
        }
    }

    return false;
}