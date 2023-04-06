import {
    hasIn,
    // get
} from "lodash-es";

/**
 * TODO: VERY incomplete... this needs to be reworked!
 * 
 * Reflector
 * 
 * @typedef {import('@aedart/contracts').PropertyKey} PropertyKey
 * 
 */
export default class Reflector
{
    /**
     * Determine whether the target has the property or not
     * 
     * @param {object} target The target object in which to look for the property
     * @param {string | number | symbol} propertyKey The name of the property to check.
     *                                               Accepts dot notation (path) as string value.
     * 
     * @returns {boolean}
     * 
     * @throws {TypeError} If target is undefined, null, or not an object.
     */
    static has(target: object, propertyKey: string | number | symbol): boolean
    {
        return hasIn(target, propertyKey);
    }
    
    /**
     * Determine whether the target has all the properties or not
     * 
     * @param {object} target The target object in which to look for the property
     * @param {PropertyKey | PropertyKey[]} properties Name or names of properties to check.
     *                                                                             Accepts dot notation (path) as string values.
     * 
     * @returns {boolean}
     *
     * @throws {TypeError} If target is undefined, null, or not an object.
     */
    static hasAll(target: object, properties: string | number | symbol | (string | number | symbol)[]): boolean
    {
        if (!Array.isArray(properties)) {
            properties = [ properties ];
        }
        
        for (const propertyKey of properties) {
            if (!this.has(target, propertyKey)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Determine whether the target has any the properties or not
     *
     * @param {object} target The target object in which to look for the property
     * @param {string | number | symbol | (string | number | symbol)[]} properties Name or names of properties to check.
     *                                                                            Accepts dot notation (path) as string values.
     *
     * @returns {boolean}
     *
     * @throws {TypeError} If target is undefined, null, or not an object.
     */
    static hasAny(target: object, properties: string | number | symbol | (string | number | symbol)[]): boolean
    {
        if (!Array.isArray(properties)) {
            properties = [ properties ];
        }

        for (const propertyKey of properties) {
            if (this.has(target, propertyKey)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get value that matches the property name from target
     * 
     * @template T
     *
     * @param {object} target The target object in which to look for the property
     * @param {string | number | symbol} propertyKey The name of the property to check.
     *                                               Accepts dot notation (path) as string value.
     * @param {any} [defaultValue=undefined] 
     * 
     * @returns {T}
     *
     * @throws {TypeError} If target is undefined, null, or not an object.
     */
    // static get<T = any>(target: object, propertyKey: string | number | symbol, defaultValue: any = undefined): T
    // {
    //     // TODO: Assert target is an object, but also not null!
    //    
    //     return get(target, propertyKey, defaultValue);
    // }
}