import { Key } from '@aedart/contracts/support';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { toParts } from './toParts.js';

/**
 * Returns the value at a given path on a target object.
 *
 * @template T
 * @template D
 *
 * @param {object} target
 * @param {Key} path
 * @param defaultValue
 *
 * @returns {any}
 */
export function get<T = any, D = undefined>(
    target: object,
    path: Key,
    defaultValue: D = undefined as unknown as D,
): T | D
{
    if (target === null || typeof target !== 'object') {
        return defaultValue;
    }

    const segments = toParts(path);
    const len = segments.length;
    if (len === 0) {
        return defaultValue;
    }

    let current: any = target;

    for (let i = 0; i < len; i++) {
        const key = segments[i];

        // Security check and existence check
        if (
            isKeyUnsafe(key) || current === null || typeof current !== 'object' || !(key in current)
        ) {
            return defaultValue;
        }

        current = current[key];
    }

    return current === undefined
        ? defaultValue
        : current as T;
}
