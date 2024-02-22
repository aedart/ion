import Concern from "./Concern";
import { PROVIDES } from "./index";

/**
 * Concern Constructor
 * 
 * @template T extends Concern
 * 
 * @see Concern
 */
export default interface ConcernConstructor<T extends Concern = Concern>
{
    /**
     * Creates a new concern instance
     *
     * @param {object} [owner] The owner class instance this concern is injected into.
     *                         Defaults to `this` concern instance if none given.
     *
     * @throws {Error} When concern is unable to preform initialisation, e.g. caused
     *                 by the owner or other circumstances.
     */
    new (owner?: object): T;

    /**
     * Returns list of property keys that this concern class offers.
     * 
     * **Note**: _Only properties and methods returned by this method can be aliased
     * into a target class._
     * 
     * @static
     * 
     * @return {PropertyKey[]}
     */
    [PROVIDES](): PropertyKey[];
}