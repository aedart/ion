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
     * Returns the target class instance this concern is injected into
     * 
     * @return {object}
     */
    get concernOwner(): object;
}