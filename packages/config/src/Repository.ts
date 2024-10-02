import type { Repository as RepositoryContract } from "@aedart/contracts/config";
import type { Key } from "@aedart/contracts/support";
import {
    set,
    get,
    has,
    forget
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
     * @type {Record<PropertyKey, any>}
     * 
     * @protected
     */
    protected items: Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Create a new Configuration Repository instance
     * 
     * @param {Record<PropertyKey, any>} [items]
     */
    public constructor(items: Record<PropertyKey, any> = {}) /* eslint-disable-line @typescript-eslint/no-explicit-any */
    { 
        this.items = items;
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
     * Get all configuration items
     *
     * @return {Record<PropertyKey, any>}
     */
    public all(): Record<PropertyKey, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        return this.items;
    }
}