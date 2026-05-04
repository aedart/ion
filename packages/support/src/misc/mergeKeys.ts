import type { Key } from '@aedart/contracts/support';
import { isPropertyKey } from './isPropertyKey.js';

/**
 * Merge multiple {@link Key}s into a single key
 *
 * @param {...Key} keys
 *
 * @returns {Key} Merged key. Empty key if no arguments given.
 *
 * @throws {TypeError} If an argument is not a valid key
 */
export function mergeKeys(...keys: Key[]): Key
{
    const totalArgs = keys.length;
    if (totalArgs === 0) {
        return [];
    }

    const result: PropertyKey[] = [];

    for (let i = 0; i < totalArgs; i++) {
        const current = keys[i];

        if (Array.isArray(current)) {
            const subLength = current.length;
            for (let j = 0; j < subLength; j++) {
                const element = current[j];

                if (!isPropertyKey(element)) {
                    throw new TypeError(
                        `mergeKeys(): Argument #${i} contains an invalid property key at index ${j}`,
                    );
                }

                result.push(element);
            }
        } else {
            if (!isPropertyKey(current)) {
                throw new TypeError(
                    `mergeKeys(): Argument #${i} must be a valid "key", ${typeof current} given`,
                );
            }

            result.push(current);
        }
    }

    return result;
}
