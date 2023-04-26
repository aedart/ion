/**
 * Reflection
 * 
 * Contains meta information about a target element. 
 */
export default interface Reflection
{
    /**
     * The name of the element
     * 
     * @returns {string | symbol | undefined}
     */
    get name(): string | symbol | undefined;
    
    /**
     * The kind of element
     * 
     * @returns {string}
     */
    get kind(): string;

    /**
     * Determine if element is declared as static
     * 
     * @returns {boolean}
     */
    get static(): boolean;

    /**
     * Determine if element is declared as private
     * 
     * @returns {boolean}
     */
    get private(): boolean;

    /**
     * Opposite of {@link private}
     * 
     * @returns {boolean}
     */
    get public(): boolean;

    /**
     * Target element
     * 
     * **Note**: value is undefined if target element is not an
     * object (e.g. if a primitive value), or if target element
     * otherwise cannot be referenced.
     * 
     * @returns {WeakRef<object> | undefined}
     */
    get target(): WeakRef<object> | undefined;

    /**
     * Determine if target is set
     * 
     * @returns {boolean} True if target {@link WeakRef.deref} returns object instance.
     */
    hasTarget(): boolean;

    /**
     * Owner of target
     * 
     * A target owner can either be a class (_if element is static_),
     * or a class instance.
     * 
     * @returns {object | undefined}
     */
    get owner(): WeakRef<object> | undefined;

    /**
     * Determine if owner is set
     *
     * @returns {boolean} True if owner {@link WeakRef.deref} returns object instance.
     */
    hasOwner(): boolean;
}