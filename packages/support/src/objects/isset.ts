import { isset as _isset } from "@aedart/support/misc";
import {get} from "./get";
import type {Key} from "@aedart/contracts/support";

/**
 * Determine if properties at given paths are declared, and their values are not undefined or null
 * 
 * @template T
 * 
 * @param {T} object
 * @param {...Key} paths
 * 
 * @returns {boolean}
 */
export function isset<T>(object: T, ...paths: (Key)[]): boolean
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