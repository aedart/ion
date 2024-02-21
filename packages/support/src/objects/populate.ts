import { isKeySafe } from "@aedart/support/reflections";

/**
 * Populate target object with the properties from source object
 * 
 * **Warning**: _This method performs a shallow copy of properties in source object!_
 * 
 * **Warning**: _`target` object is mutated!_
 * 
 * **Note**: _Properties that are [unsafe]{@link import('@aedart/support/reflections').isKeyUnsafe} are always disregarded!_
 * 
 * @template T = object
 * 
 * @param {object} target
 * @param {object} source
 * @param {PropertyKey | PropertyKey[]} [keys='*'] If wildcard (`*`) given, then all properties from the `source` are selected.
 * @param {boolean} [safe=true] When `true`, properties must exist in target (_must be defined in target_),
 *                              before they are shallow copied.
 *                              
 * @returns {object} The populated target
 * 
 * @throws {TypeError} If a key does not exist in `target` (_when `safe = true`_).
 *                     Or, if key does not exist in `source` (_regardless of `safe` flag_).
 */
export function populate<T extends object = object>(
    target: T,
    source: object,
    keys: PropertyKey|PropertyKey[] = '*',
    safe: boolean = true
): T
{
    if (keys === '*') {
        keys = Reflect.ownKeys(source);
    }
    
    if (!Array.isArray(keys)) {
        keys = [ keys ];
    }

    // Always remove dangerous keys
    keys = keys.filter((key: PropertyKey) => isKeySafe(key));
    
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