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
     */
    constructor(owner: object);
    
    /**
     * Returns the target class instance this concern was injected into
     * 
     * @return {object}
     */
    get concernOwner(): object;
}