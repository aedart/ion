import { Key } from "./types";

/**
 * Has Arbitrary Data
 */
export default interface HasArbitraryData
{
    /**
     * Set value for key
     * 
     * @param {Key} key
     * @param {any} value
     * 
     * @return {this}
     */
    set(key: Key, value: any): this; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Get value for key, or default if key does not exist
     * 
     * @template T
     * @template D=undefined
     * 
     * @param {Key} key
     * @param {D} [defaultValue]
     * 
     * @return {T | D}
     */
    get<T, D = undefined>(key: Key, defaultValue?: D): T | D;

    /**
     * Determine if value exists for key
     * 
     * @param {Key} key
     * 
     * @return {boolean}
     */
    has(key: Key): boolean;

    /**
     * Delete value for key
     * 
     * @param {Key} key
     * 
     * @return {boolean}
     */
    forget(key: Key): boolean;

    /**
     * Returns all arbitrary data
     * 
     * @return {Record<PropertyKey, any>}
     */
    all(): Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Flush all arbitrary data
     * 
     * @return {void}
     */
    flush(): void;
}