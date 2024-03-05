import {Key} from "@aedart/contracts/support";
import {isKey} from "./isKey";

/**
 * Merge multiple {@link Key}s into a single key
 * 
 * @param {...Key} keys
 * 
 * @return {Key} Merged key. Empty key if no arguments given.
 * 
 * @throws {TypeError} If an argument is not a valid key
 */
export function mergeKeys(...keys: Key[]): Key
{
    // Return empty key, when no keys given
    if (arguments.length === 0) {
        return [];
    }
    
    const mapped = keys.map<Key>((key: Key, index: number) => {
        let modifiedKey = key;
        
        if (!isKey(modifiedKey)) {
            throw new TypeError(`mergeKeys(): Argument #${index} must be a valid "key", ${typeof key} given`);
        }
        
        if (!Array.isArray(modifiedKey)) {
            modifiedKey = [ modifiedKey ] as Key;
        }
        
        return modifiedKey;
    });
    
    // @ts-expect-error This should be fine here. TS does not understand this merge...
    return [].concat(...mapped) as Key;
}