import type { AllowedKeys, AllowedKeysCallback } from '@aedart/contracts/support/objects';
import { LOOKUP_THRESHOLD } from '../arrays/index.js';
import { isKeySafe } from '../reflections/isKeySafe.js';

/**
 * Populate target object with the properties from source object
 *
 * **Warning**: _This method performs a shallow copy of properties!_
 *
 * **Warning**: _`target` object is mutated!_
 *
 * **Note**: _Properties that are [unsafe]{@link import('@aedart/support/reflections').isKeyUnsafe} are always disregarded!_
 *
 * @template TargetObj extends object = object
 * @template SourceObj extends object = object
 *
 * @param {TargetObj} target
 * @param {SourceObj} source
 * @param {AllowedKeys} [allowed='*'] The allowed keys to be copied into the `target`.
 * @param {boolean} [safe=true] When `true`, properties must exist in target (_must be defined in target_),
 *                              before they are shallow copied. If `false`, then `allowed` is ignored and
 *                              all properties from `source` are attempted copied into `target`.
 *
 * @returns {TargetObj}
 *
 * @throws {TypeError} If a key does not exist in `target` (_when `safe = true`_).
 *                     Or, if key does not exist in `source` (_regardless of `safe` flag_).
 *
 * @throws {Error} If unable to define property in `target`.
 */
export function populate<
    TargetObj extends object = object,
    SourceObj extends object = object,
>(
    target: TargetObj,
    source: SourceObj,
    allowed: AllowedKeys = '*',
    safe = true,
): TargetObj
{
    const sourceKeys = Reflect.ownKeys(source);
    const len = sourceKeys.length;

    if (len === 0) {
        return target;
    }

    // 1. Resolve allowed keys into a searchable collection
    let allowedCollection: PropertyKey[] | Set<PropertyKey> | null = null;
    if (safe) {
        let resolved: PropertyKey[];
        if (allowed === '*') {
            resolved = Reflect.ownKeys(target);
        } else if (typeof allowed === 'function') {
            resolved = (allowed as AllowedKeysCallback<TargetObj, SourceObj>)(target, source);
        } else {
            resolved = Array.isArray(allowed) ? allowed : [allowed];
        }

        // Apply Collection Threshold (16) per Performance Patterns
        allowedCollection = resolved.length > LOOKUP_THRESHOLD
            ? new Set(resolved)
            : resolved;
    }

    // 2. High-performance index-based loop (No .filter() to avoid GC pressure)
    for (let i = 0; i < len; i++) {
        const key = sourceKeys[i];

        // Security: Prototype Pollution Guard
        if (!isKeySafe(key)) {
            continue;
        }

        // 3. Safe-mode validation
        if (safe && allowedCollection !== null) {
            const isAllowed = (allowedCollection instanceof Set)
                ? allowedCollection.has(key)
                : allowedCollection.includes(key);

            if (!isAllowed) {
                continue;
            }

            if (!Reflect.has(target, key)) {
                throw new TypeError(`Key "${String(key)}" does not exist in target object`);
            }
        }

        // 4. Descriptor transfer
        const descriptor = Reflect.getOwnPropertyDescriptor(source, key);
        if (descriptor === undefined) {
            throw new TypeError(`Key "${String(key)}" does not exist in source object`);
        }

        if (!Reflect.defineProperty(target, key, descriptor)) {
            throw new Error(`Failed to define property "${String(key)}" on target object`);
        }
    }

    return target;
}
