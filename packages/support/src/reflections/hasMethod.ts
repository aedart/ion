import { hasAllMethods } from "./hasAllMethods";

/**
 * Determine if given target object contains method
 * 
 * @param {object} target
 * @param {PropertyKey} method
 *
 * @return {boolean}
 */
export function hasMethod(target: object, method: PropertyKey): boolean
{
    return hasAllMethods(target, method);
}