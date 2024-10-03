import type {
    Repository as RepositoryContract,
    Items
} from "@aedart/contracts/config";
import type { Key } from "@aedart/contracts/support";
import {
    set,
    get,
    has,
    forget,
    shallowMerge
} from "@aedart/support/objects";

/**
 * Configuration Repository
 * 
 * @see {import('@aedart/contracts/config').Repository}
 */
export default class Repository implements RepositoryContract
{
    /**
     * The configuration items
     * 
     * @type {Items}
     * 
     * @protected
     */
    protected items: Items;

    /**
     * Create a new Configuration Repository instance
     * 
     * @param {Items} [items]
     */
    public constructor(items: Items = {})
    { 
        this.items = shallowMerge(items);
    }
    
    /**
     * Set configuration value for given key
     *
     * @param {Key} key
     * @param {any} value
     *
     * @return {this}
     */
    public set(key: Key, value: any): this /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        set(this.items, key, value);
        
        return this;
    }

    /**
     * Get configuration value that matches given key
     *
     * @template T Return type
     * @template D=undefined Default value type
     *
     * @param {Key} key
     * @param {D} [defaultValue] Default value to be returned, when no value exists for key.
     *
     * @return {T | D}
     */
    public get<T, D = undefined>(key: Key, defaultValue?: D): T | D
    {
        if (!this.has(key)) {
            return defaultValue as D;
        }
        
        return get(this.items, key) as T;
    }

    /**
     * Determine if configuration value exists for given key
     *
     * @param {Key} key
     *
     * @return {boolean}
     */
    public has(key: Key): boolean
    {
        return has(this.items, key);
    }

    /**
     * Prepend value onto an array configuration value
     *
     * @param {Key} key
     * @param {any} value
     *
     * @return {this}
     */
    public prepend(key: Key, value: any): this /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        const arr = this.get<any[], any[]>(key, []); /* eslint-disable-line @typescript-eslint/no-explicit-any */

        arr.unshift(value);

        this.set(key, arr);
        
        return this;
    }

    /**
     * Push value onto an array configuration value
     *
     * @param {Key} key
     * @param {any} value
     *
     * @return {this}
     */
    public push(key: Key, value: any): this /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        const arr = this.get<any[], any[]>(key, []); /* eslint-disable-line @typescript-eslint/no-explicit-any */
        
        arr.push(value);
        
        this.set(key, arr);
        
        return this;
    }

    /**
     * Delete configuration value
     *
     * @param {Key} key
     *
     * @return {boolean}
     */
    public forget(key: Key): boolean
    {
        return forget(this.items, key);
    }

    /**
     * Merge items into this repository's configuration items
     *
     * **Caution**: _Merging is performed via [shallow coping](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) of items._
     *
     * @param {Items} items
     *
     * @return {this}
     */
    public merge(items: Items): this
    {
        this.items = shallowMerge(this.items, items);
        
        return this;
    }
    
    /**
     * Get all configuration items
     *
     * @return {Items}
     */
    public all(): Items
    {
        return this.items;
    }
}