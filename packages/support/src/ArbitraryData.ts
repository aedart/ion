import type { HasArbitraryData, Key } from "@aedart/contracts/support";
import { AbstractConcern } from "@aedart/support/concerns";
import { set, get, has, forget, merge } from "@aedart/support/objects";

/**
 * Concerns Arbitrary Data
 * 
 * @see HasArbitraryData
 * 
 * @mixin
 * @extends AbstractConcern
 */
export default class ArbitraryData extends AbstractConcern implements HasArbitraryData
{
    /**
     * The arbitrary data record
     * 
     * @type {Record<PropertyKey, any>}
     * 
     * @private
     */
    #data: Record<PropertyKey, any> = {};

    /**
     * Set value for key
     *
     * @param {Key} key
     * @param {any} value
     *
     * @return {this}
     */
    set(key: Key, value: any): this /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        set(this.#data, key, value);
        
        return this.concernOwner as this;
    }

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
    get<T, D = undefined>(key: Key, defaultValue?: D): T | D
    {
        return get(this.#data, key, defaultValue);
    }

    /**
     * Determine if value exists for key
     *
     * @param {Key} key
     *
     * @return {boolean}
     */
    has(key: Key): boolean
    {
        return has(this.#data, key);
    }

    /**
     * Delete value for key
     *
     * @param {Key} key
     *
     * @return {boolean}
     */
    forget(key: Key): boolean
    {
        return forget(this.#data, key);
    }

    /**
     * Returns all arbitrary data
     *
     * @return {Record<PropertyKey, any>}
     */
    all(): Record<PropertyKey, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        // Returns a copy of the arbitrary data record
        return merge(this.#data);
    }

    /**
     * Flush all arbitrary data
     *
     * @return {void}
     */
    flush(): void
    {
        this.#data = {};
    }
}