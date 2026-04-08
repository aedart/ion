import type { SourceKeysCallback } from '@aedart/contracts/support/objects';
import { isKeySafe } from '../reflections/isKeySafe.js';

/**
 * Populate target object with the properties from source object
 *
 * **Warning**: _This method performs a shallow copy of properties in source object!_
 *
 * **Warning**: _`target` object is mutated!_
 *
 * **Note**: _Properties that are [unsafe]{@link import('@aedart/support/reflections').isKeyUnsafe} are always disregarded!_
 *
 * @template TargetObj extends object = object
 * @template SourceObj extends object = object
 *
 * @param {object} target
 * @param {object} source
 * @param {PropertyKey | PropertyKey[] | SourceKeysCallback} [keys='*'] Keys to select and copy from `source` object.
 *                                                 If wildcard (`*`) given, then all properties from the `source`
 *                                                 are selected. If a callback is given, then that callback must return
 *                                                 key or keys to select from `source`.
 * @param {boolean} [safe=true] When `true`, properties must exist in target (_must be defined in target_),
 *                              before they are shallow copied.
 *
 * @returns {object} The populated target
 *
 * @throws {TypeError} If a key does not exist in `target` (_when `safe = true`_).
 *                     Or, if key does not exist in `source` (_regardless of `safe` flag_).
 */
export function populate<
    TargetObj extends object = object,
    SourceObj extends object = object,
>(
    target: TargetObj,
    source: SourceObj,
    keys: PropertyKey | PropertyKey[] | SourceKeysCallback = '*',
    safe: boolean = true,
): TargetObj
{
    let resolvedKeys: PropertyKey | PropertyKey[];

    if (keys === '*') {
        resolvedKeys = Reflect.ownKeys(source);
    } else if (typeof keys === 'function') {
        resolvedKeys = (keys as SourceKeysCallback<SourceObj, TargetObj>)(source, target);
    } else {
        resolvedKeys = keys;
    }

    const keysToProcess = Array.isArray(resolvedKeys) ? resolvedKeys : [resolvedKeys];
    const len = keysToProcess.length;

    // High-performance index-based loop
    for (let i = 0; i < len; i++) {
        const key = keysToProcess[i];

        // 1. Prototype Pollution Guard
        if (!isKeySafe(key)) {
            continue;
        }

        // 2. Safe-mode: Check if key exists in target
        if (safe && !Reflect.has(target, key)) {
            throw new TypeError(`Key "${String(key)}" does not exist in target object`);
        }

        // 3. Obtain Descriptor from source
        const descriptor = Reflect.getOwnPropertyDescriptor(source, key);
        if (descriptor === undefined) {
            // Fail if property does not exist in source
            throw new TypeError(`Key "${String(key)}" does not exist in source object`);
        }

        // 4. Define property with descriptors to handle getters/setters correctly
        const success = Reflect.defineProperty(target, key, descriptor);
        if (!success) {
            throw new Error(`Failed to define property "${String(key)}" on target object`);
        }
    }

    return target;
}
