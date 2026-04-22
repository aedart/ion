import { Key } from '@aedart/contracts/support';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { toParts } from './toParts.js';

/**
 * Sets a value at a given path on a target object.
 *
 * @param {object} target
 * @param {Key} path
 * @param value
 */
export function set(target: object, path: Key, value: any): void
{
    if (target === null || typeof target !== 'object') {
        return;
    }

    const segments = toParts(path);
    const len = segments.length;
    if (len === 0) {
        return;
    }

    let current: any = target;

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

        // If current key doesn't exist or isn't an object/array, initialize it
        if (
            current[key] === undefined || current[key] === null || typeof current[key] !== 'object'
        ) {
            // NEW: Only check for numeric index if the next key is a string.
            // Symbols can never be array indices in this path context.
            const isNextKeyIndex = typeof nextKey === 'string'
                && nextKey !== ''
                && !Number.isNaN(Number(nextKey));

            current[key] = isNextKeyIndex ? [] : {};
        }

        current = current[key];
    }
}
