import type { Key } from '@aedart/contracts/support';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { toParts } from './toParts.js';

/**
 * Sets a value at a given path on a target object.
 *
 * @param {object} target - The target object to set the value on.
 * @param {Key} path - The key or path to set the value at.
 * @param {unknown} value - The value to set.
 */
export function set(target: object, path: Key, value: unknown): void
{
    if (target === null || typeof target !== 'object') {
        return;
    }

    const segments = toParts(path);
    const len = segments.length;
    if (len === 0) {
        return;
    }

    let current: Record<PropertyKey, unknown> = target as Record<PropertyKey, unknown>;
    for (let i = 0; i < len; i++) {
        const key = segments[i];

        if (isKeyUnsafe(key)) {
            break;
        }

        // Final segment: assign the value and exit
        if (i === len - 1) {
            current[key] = value;
            break;
        }

        // Determine if we should create an array or an object for the next level
        const nextKey = segments[i + 1];

        // If current key doesn't exist or isn't an object/array, initialize it.
        // If it exists but is NOT an own property, we must shadow it to avoid
        // mutating the prototype's nested objects!
        // We use Object.create() for objects to ensure that subsequent levels
        // are also correctly identified as "not own" properties, allowing for
        // recursive shadowing.
        if (
            current[key] === undefined || current[key] === null || typeof current[key] !== 'object'
        ) {
            // Only check for numeric index if the next key is a string.
            // Symbols can never be array indices in this path context.
            const isNextKeyIndex = typeof nextKey === 'string'
                && nextKey !== ''
                && !Number.isNaN(Number(nextKey));
            current[key] = isNextKeyIndex ? [] : {};
        } else if (!Object.prototype.hasOwnProperty.call(current, key)) {
            current[key] = Array.isArray(current[key])
                ? [...(current[key] as unknown[])]
                : Object.create(current[key]);
        }

        current = current[key] as Record<PropertyKey, unknown>;
    }
}
