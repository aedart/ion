import { Arrayable } from "@aedart/contracts/support";

/**
 * Reflection
 */
export default interface Reflection extends Arrayable
{
    /**
     * The name of the element
     * 
     * @returns {string | symbol}
     */
    get name(): string | symbol;
    
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
     * Reference to target element
     * 
     * **Note**: value is undefined if target element is not an
     * object (e.g. if a primitive value), or if target element
     * otherwise cannot be referenced.
     * 
     * @returns {WeakRef<object> | undefined}
     */
    get target(): WeakRef<object> | undefined;

    /**
     * Determine if this reflection has a valid target reference
     * 
     * @returns {boolean}
     */
    hasTarget(): boolean;
}