import type { Repository as RepositoryContract } from "@aedart/contracts/support/env";
import { merge } from "@aedart/support/objects";
import Repository from "./Repository";
import ReadonlyAdaptor from "./adaptors/ReadonlyAdaptor";

 /**
 * Environment Variables Utility
 * 
 * An adaptation of Laravel's Env class.
 * 
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Support/Env.php
 */
export default class Env
{
    /**
     * Environment Variables Repository
     * 
     * @type {import('@aedart/contracts/support/env').Repository}
     * 
     * @private
     * @static
     */
    static #repo: RepositoryContract | null = null;

    /**
     * Define the environment variables
     *
     * **Caution**: _Defined environment variables can still be [cleared]{@link clear}!_
     * 
     * @param {Record<PropertyKey, any>} variables
     * @param {boolean} [safe=true] If true, then the defined variables cannot be changed. **Note**, defined variables
     *                              can still be [cleared]{@link clear}!
     * 
     * @return {void}
     * 
     * @static
     */
    public static define(variables: Record<PropertyKey, any>, safe: boolean = true): void /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.clear();

        // When requested defined as "safe", the environment variables object must be copied,
        // such that outside changes to the given record do not affect those defined here.
        // Also, a "read-only" repository adapter is used, to prevent setting or deleting
        // variables...
        if (safe) {
            const store = merge(Object.create(null), variables) as Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */
            
            this.#repo = new ReadonlyAdaptor(
                new Repository(store)
            );

            return;
        }
        
        this.#repo = new Repository(variables);
    }

    /**
     * Define environment variables as read-only
     * 
     * **Caution**: _Defined environment variables can still be [cleared]{@link clear}!_
     * 
     * @param {Record<PropertyKey, any>} variables
     * 
     * @return {void}
     * 
     * @static
     */
    public static defineSafe(variables: Record<PropertyKey, any>): void /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.define(variables, true);
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
     * 
     * @static
     */
    public static get<T, D = undefined>(key: PropertyKey, defaultValue?: D): T | D
    {
        if (!this.has(key)) {
            return defaultValue as D;
        }
        
        const value = this.repository.get<T>(key);
        if (typeof value !== 'string') {
            return value as T;
        }

        // Convert value to boolean or null, if needed. This part is heavily
        // inspired by Laravel's way of converting env values.
        // @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Support/Env.php#L99

        switch (value.toLowerCase()) {
            case "true":
            case "(true)":
                return true as T;
                
            case "false":
            case "(false)":
                return false as T;
                
            case "null":
            case "(null)":
                return null as T;

            default:
                return value as T;
        }
    }

    /**
     * Determine if environment variable has been defined
     *
     * @param {PropertyKey} key
     *
     * @return {boolean}
     * 
     * @static
     */
    public static has(key: PropertyKey): boolean
    {
        return this.repository.has(key);
    }
    
    /**
     * Environment Variables Repository
     * 
     * @type {import('@aedart/contracts/support/env').Repository}
     * 
     * @readonly
     * @static
     */
    public static get repository(): RepositoryContract
    {
        // In case that no environment variables have been defined,
        // define an empty repository.
        if (this.#repo === null) {
            this.define({});
        }
        
        return this.#repo as RepositoryContract;
    }
    
    /**
     * Clear all defined environment variables
     * 
     * @return {void}
     * 
     * @static
     */
    public static clear(): void
    {
        this.#repo = null;
    }
}