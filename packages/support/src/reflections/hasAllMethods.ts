import { isset } from "@aedart/support/misc";
import { isMethod } from "./isMethod";

/**
 * Determine if given target object contains all given methods
 * 
 * @param {object} target
 * @param {...PropertyKey} [methods]
 * 
 * @return {boolean}
 */
export function hasAllMethods(target: object, ...methods: PropertyKey[]): boolean
{
    if (!isset(target) || typeof target != 'object' || Array.isArray(target) || methods.length === 0) {
        return false;
    }
    
    for (const method of methods) {
        if (!isMethod(target, method)) {
            return false;
        }
    }
    
    return true;
}