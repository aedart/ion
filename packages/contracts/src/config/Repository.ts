import { Key } from "@aedart/contracts/support";

/**
 * Configuration Repository
 * 
 * Adaptation of Laravel's configuration `Repository`.
 * 
 * @see https://github.com/laravel/framework/blob/master/src/Illuminate/Contracts/Config/Repository.php
 */
export default interface Repository
{
    /**
     * Set configuration value for given key
     * 
     * @param {Key} key
     * @param {any} value
     * 
     * @return {this}
     */
    set(key: Key, value: any): this; /* eslint-disable-line @typescript-eslint/no-explicit-any */

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
    get<T, D = undefined>(key: Key, defaultValue?: D): T | D;

    /**
     * Determine if configuration value exists for given key
     * 
     * @param {Key} key
     * 
     * @return {boolean}
     */
    has(key: Key): boolean;

    /**
     * Prepend value onto an array configuration value
     * 
     * @param {Key} key
     * @param {any} value
     * 
     * @return {this}
     */
    prepend(key: Key, value: any): this; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Push value onto an array configuration value
     *
     * @param {Key} key
     * @param {any} value
     *
     * @return {this}
     */
    push(key: Key, value: any): this; /* eslint-disable-line @typescript-eslint/no-explicit-any */
    
    /**
     * Delete configuration value
     * 
     * @param {Key} key
     * 
     * @return {boolean}
     */
    forget(key: Key): boolean;

    /**
     * Get all configuration items
     * 
     * @return {Record<PropertyKey, any>}
     */
    all(): Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */
}