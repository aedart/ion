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
     * @returns {object | undefined}
     */
    get target(): object | undefined;

    /**
     * Owner of target
     * 
     * Typically, this will correspond to the class that defines
     * the target (not class instance).
     * 
     * @returns {object | undefined}
     */
    get owner(): object | undefined;
}