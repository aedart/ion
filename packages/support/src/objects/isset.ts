import { isset as _isset } from "@aedart/support/misc";
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
    if (object === undefined || paths.length === 0) {
        return false;
    }

    for (const path of paths) {
        if (!_isset(get(object, path))) {
            return false;
        }
    }
    
    return true;
}