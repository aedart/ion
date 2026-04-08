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
    clone(): this;
}