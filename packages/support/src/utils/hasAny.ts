import { has } from './has';
import type { PropertyPath } from 'lodash';

/**
 * Determine if object has any of the given properties
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * @template T
 *
 * @param {T} object Target object
 * @param {PropertyPath[]} paths List of property paths
 *
 * @returns {boolean}
 */
export function hasAny<T>(object: T, paths: PropertyPath[]): boolean
{
    for (const path of paths) {
        if (has(object, path)) {
            return true;
        }
    }

    return false;
}