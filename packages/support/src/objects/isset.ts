import type { Key } from '@aedart/contracts/support';
import { isset as _isset } from '../misc/isset.js';
import { get } from './get.js';

/**
 * Determine if properties at given paths are declared, and their values are not undefined or null
 *
 * @param {object} target
 * @param {...Key} paths
 *
 * @returns {boolean}
 */
export function isset(target: object, ...paths: Key[]): boolean
{
    const len = paths.length;
    if (target === undefined || len === 0) {
        return false;
    }

    // Performance: Use index-based loop for CPU cache locality and to avoid iterator overhead
    for (let i = 0; i < len; i++) {
        if (!_isset(get(target, paths[i]))) {
            return false;
        }
    }

    return true;
}
