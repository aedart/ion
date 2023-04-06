import {get} from "./get";
import type {PropertyPath} from "lodash";

/**
 * Determine if properties at given paths are declared, and their values are not undefined or null
 * 
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * @template T
 * 
 * @param {T} object
 * @param {...PropertyPath} paths
 * 
 * @returns {boolean}
 */
export function isset<T>(object: T, ...paths: (PropertyPath)[]): boolean
{
    for (const path of paths) {
        const value = get(object, path);
        if (value === undefined || value === null) {
            return false;
        }
    }
    
    return true;
}