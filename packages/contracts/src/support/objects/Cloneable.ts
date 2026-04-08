/**
 * Cloneable Symbol
 *
 * @type {unique symbol}
 */
export const CLONE: unique symbol = Symbol('@aedart/support/objects/clone');

/**
 * Cloneable
 */
export default interface Cloneable
{
    /**
     * Returns a clone (new instance) of this object
     *
     * @return {this}
     *
     * @throws {Error}
     */
    [CLONE](): this;
}
