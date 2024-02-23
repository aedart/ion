import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { CONCERN_CLASSES } from "./index";
import ConcernConstructor from "./ConcernConstructor";
import Owner from "./Owner";

/**
 * Must Use Concerns
 * 
 * Defines a list of concern classes that this class instance must use.
 * 
 * **Note**: _The herein defined properties and methods MUST be implemented as static_
 * 
 * @template T = object
 */
export default interface MustUseConcerns<T = object>
{
    /**
     * Constructor
     *
     * @template T = object
     * 
     * @param {...any} [args]
     *
     * @returns {ConstructorOrAbstractConstructor<T> & Owner}
     */
    new(
        ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): ConstructorOrAbstractConstructor<T & Owner>;
    
    /**
     * A list of the concern classes to be used by this target class.
     * 
     * **Note**: _If this class' parent class also uses concerns, then those
     * concern classes are included recursively in this list, in the order
     * that they have been registered._
     *
     * @static
     * 
     * @type {ConcernConstructor}
     */
    [CONCERN_CLASSES]: ConcernConstructor[];
}