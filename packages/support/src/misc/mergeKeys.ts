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
    
    keys = keys.map<Key>((key: Key, index: number) => {
        if (!isKey(key)) {
            throw new TypeError(`mergeKeys(): Argument #${index} must be a valid "key", ${typeof key} given`);
        }
        
        if (!Array.isArray(key)) {
            key = [ key ];
        }
        
        return key;
    });
    
    return [].concat(...keys);
}