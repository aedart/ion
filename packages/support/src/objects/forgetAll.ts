import type { Key } from '@aedart/contracts/support';
import { forget } from './forget.js';

/**
 * Remove all values in object that match given paths
 *
 * @param {object} target Target object
 * @param {...Key} paths Property path(s)
 */
export function forgetAll(target: object, ...paths: Key[]): void
{
    const len = paths.length;
    if (target === undefined || len === 0) {
        return;
    }

    for (let i = 0; i < len; i++) {
        forget(target, paths[i]);
    }
}
