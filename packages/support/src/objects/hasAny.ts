import { has } from './has';
import type { PropertyPath } from 'lodash';

/**
 * Determine if any paths are properties of given object
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