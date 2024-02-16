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
     * The owner class instance this concern is injected into,
     * or `this` concern instance if no owner was set.
     *
     * @readonly
     * 
     * @type {object}
     */
    get concernOwner(): object;
}