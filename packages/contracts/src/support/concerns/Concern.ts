/**
 * Concern
 *
 * A "concern" is component that can be injected into a target class (concern owner).
 * The concern itself is NOT responsible for performing the actual injection logic.
 * 
 * @interface
 */
export default interface Concern
{
    /**
     * Creates a new concern instance
     * 
     * @param {object} owner The target class instance this concern is injected into
     * 
     * @throws {Error} When concern is unable to preform initialisation, e.g. caused
     *                 by the owner or other circumstances. 
     */
    constructor(owner: object);
    
    /**
     * Returns the target class instance this concern is injected into
     * 
     * @return {object}
     */
    get concernOwner(): object;
}