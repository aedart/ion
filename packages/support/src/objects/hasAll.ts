import { has } from './has';
import type { PropertyPath } from 'lodash';

/**
 * Determine if all paths are properties of given object
 * 
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * @template T
 * 
 * @param {T} object Target object
 * @param {...PropertyPath} paths Property path(s)
 * 
 * @returns {boolean}
 */
export function hasAll<T>(object: T, ...paths: (PropertyPath)[]): boolean
{
    if (object === undefined || paths.length === 0) {
        return false;
    }

    for (const path of paths) {
        if (!has(object, path)) {
            return false;
        }
    }

    return true;
}