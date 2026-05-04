import type { Key } from '@aedart/contracts/support';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { toParts } from './toParts.js';

/**
 * Returns the value at a given path on a target object.
 *
 * @template T - The expected return type of the resolved value.
 * @template D - The type of the default value, defaults to `undefined`.
 *
 * @param {object} target - The target object to retrieve the value from.
 * @param {Key} path - The key or path to resolve.
 * @param {D} [defaultValue] - The value to return if the path does not exist.
 *
 * @returns {T | D} The resolved value, or the default value if the path does not exist.
 */
export function get<T = unknown, D = undefined>(
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

    let current: Record<PropertyKey, unknown> = target as Record<PropertyKey, unknown>;
    for (let i = 0; i < len; i++) {
        const key = segments[i];

        // Security check and existence check
        if (
            isKeyUnsafe(key) || current === null || typeof current !== 'object' || !(key in current)
        ) {
            return defaultValue;
        }

        current = current[key] as Record<PropertyKey, unknown>;
    }

    return current === undefined
        ? defaultValue
        : current as T;
}