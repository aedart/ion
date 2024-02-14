/**
 * Concern
 * 
 * A component that can be injected into a target class (concern owner).
 */
export default interface Concern
{
    /**
     * Creates a new concern instance
     * 
     * @param {object} owner The target class instance this concern was injected into
     * 
     * @throws {TypeError} If this concern does not support given owner
     */
    constructor(owner: object);
    
    /**
     * Returns the target class instance this concern was injected into
     * 
     * @return {object}
     */
    get concernOwner(): object;
}