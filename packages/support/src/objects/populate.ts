import { isKeySafe } from "@aedart/support/reflections";
import type { SourceKeysCallback } from "@aedart/contracts/support/objects";

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
 *                                                 are selected.
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
    SourceObj extends object = object
>(
    target: TargetObj,
    source: SourceObj,
    keys: PropertyKey | PropertyKey[] | SourceKeysCallback = '*',
    safe: boolean = true
): TargetObj
{
    if (keys === '*') {
        keys = Reflect.ownKeys(source);
    } else if (typeof keys == 'function') {
        keys = (keys as SourceKeysCallback)(source, target);
    }
    
    if (!Array.isArray(keys)) {
        keys = [ keys as PropertyKey ];
    }

    // Always remove dangerous keys, regardless of "safe" flag.
    keys = (keys as PropertyKey[]).filter((key: PropertyKey) => isKeySafe(key));
    
    // Populate...
    for (const key of keys) {
        // If "safe" is enabled, then only keys that are already defined in target are allowed.
        if (safe && !Reflect.has(target, key)) {
            throw new TypeError(`Key "${key.toString()}" does not exist in target object`);
        }
        
        // However, fail if property does not exist in source, regardless of "safe" flag.
        if (!Reflect.has(source, key)) {
            throw new TypeError(`Key "${key.toString()}" does not exist in source object`);
        }
        
        // @ts-expect-error At this point, all should be safe...
        target[key] = source[key];
    }
    
    return target;
}