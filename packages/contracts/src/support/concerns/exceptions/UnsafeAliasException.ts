import InjectionException from "./InjectionException";

/**
 * Unsafe Alias Exception
 * 
 * To be thrown when an alias points to an "unsafe" property or method inside a concern.  
 */
export default interface UnsafeAliasException extends InjectionException
{
    /**
     * The alias that points to an "unsafe" property or method
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly alias: PropertyKey;
    
    /**
     * The "unsafe" property or method that an alias points to
     * 
     * @readonly
     * 
     * @type {PropertyKey}
     */
    readonly key: PropertyKey;
}