import type { Repository as RepositoryContract } from "@aedart/contracts/support/env";

/**
 * Environment Variables Repository
 */
export default class Repository implements RepositoryContract
{
    /**
     * The environment variables store
     * 
     * @type {Record<PropertyKey, any>}
     * @private
     */
    readonly #store: Record<
        PropertyKey,
        any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >;

    /**
     * Create a new Environment Variables Repository
     * 
     * @param {Record<PropertyKey, any>} store
     */
    public constructor(store: Record<PropertyKey, any>) /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.#store = store;
    }
    
    /**
     * Set value for an environment variable
     *
     * @param {PropertyKey} key
     * @param {any} value
     *
     * @return {this}
     */
    set(key: PropertyKey, value: any): this /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.#store[key] = value;
        
        return this;
    }

    /**
     * Get value of an environment variable
     *
     * @template T
     * @template D=undefined
     *
     * @param {PropertyKey} key
     * @param {D} [defaultValue]
     *
     * @return {T | D}
     */
    public get<T, D = undefined>(key: PropertyKey, defaultValue?: D): T | D
    {
        if (!this.has(key)) {
            return defaultValue as D;
        }
        
        return this.#store[key] as T;
    }

    /**
     * Determine if environment variable has been defined
     *
     * @param {PropertyKey} key
     *
     * @return {boolean}
     */
    public has(key: PropertyKey): boolean
    {
        return Reflect.has(this.#store, key);
    }

    /**
     * Delete environment variable
     *
     * @param {PropertyKey} key
     *
     * @return {boolean}
     */
    public forget(key: PropertyKey): boolean
    {
        if (!this.has(key)) {
            return false;
        }

        delete this.#store[key];

        return true;
    }
}