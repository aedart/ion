import type { Key } from '@aedart/contracts/support';
import { forget } from './forget.js';

/**
 * Remove all values in object that match given paths
 *
 * @template T
 *
 * @param {T} object Target object
 * @param {...Key} paths Property path(s)
 */
export function forgetAll<T>(object: T, ...paths: Key[]): void
{
    const len = paths.length;
    if (object === undefined || len === 0) {
        return;
    }

    for (let i = 0; i < len; i++) {
        forget(object, paths[i]);
    }
}
