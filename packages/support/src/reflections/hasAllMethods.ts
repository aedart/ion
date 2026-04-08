import { isset } from '../misc/isset.js';
import { isMethod } from './isMethod.js';

/**
 * Determine if given target object contains all given methods
 *
 * @param {object} target
 * @param {...PropertyKey} methods
 *
 * @return {boolean}
 */
export function hasAllMethods(target: object, ...methods: PropertyKey[]): boolean
{
    const len = methods.length;
    if (!isset(target) || typeof target !== 'object' || len === 0) {
        return false;
    }

    // Optimization: Standard index-based loop for CPU cache locality
    for (let i = 0; i < len; i++) {
        if (!isMethod(target, methods[i])) {
            return false;
        }
    }

    return true;
}
