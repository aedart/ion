import type { Repository as RepositoryContract } from "@aedart/contracts/support/env";
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
        
        const repo = new Repository(variables);

        if (safe) {
            this.#repo = new ReadonlyAdaptor(repo);
            return;
        }
        
        this.#repo = repo;
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
        return this.repository.get(key, defaultValue);
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