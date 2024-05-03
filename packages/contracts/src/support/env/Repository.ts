/**
 * Environment Variables Repository
 */
export default interface Repository
{
    /**
     * Set value for an environment variable
     * 
     * @param {PropertyKey} key
     * @param {any} value
     * 
     * @return {this}
     */
    set(key: PropertyKey, value: any): this; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Get value of an environment variable
     *
     * @template T
     * @template D=undefined
     * 
     * @param {PropertyKey} key
     * @param {D} defaultValue
     * 
     * @return {T | D}
     */
    get<T, D = undefined>(key: PropertyKey, defaultValue?: D): T | D;

    /**
     * Determine if environment variable has been defined
     * 
     * @param {PropertyKey} key
     * 
     * @return {boolean}
     */
    has(key: PropertyKey): boolean;

    /**
     * Delete environment variable
     * 
     * @param {PropertyKey} key
     * 
     * @return {boolean}
     */
    forget(key: PropertyKey): boolean;
}