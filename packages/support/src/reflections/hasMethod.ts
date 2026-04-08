import { isMethod } from './isMethod.js';

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
    return isMethod(target, method);
}
