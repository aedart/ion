import type { ConstructorLike } from "@aedart/contracts";
import { CONCERN_CLASSES, ALIASES, Alias } from "./index";
import ConcernConstructor from "./ConcernConstructor";
import Owner from "./Owner";

/**
 * Uses Concerns
 * 
 * A target class that uses one or more concern classes.
 * 
 * @template T = object
 */
export default interface UsesConcerns<T = object>
{
    /**
     * Constructor
     *
     * @template T = object
     * 
     * @param {...any} [args]
     *
     * @returns {ConstructorLike<T> & Owner}
     */
    new(
        ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): ConstructorLike<T & Owner>;
    
    /**
     * A list of the concern classes to be used by this target class.
     * 
     * **Note**: _If this class' parent class also uses concerns, then those
     * concern classes are included recursively in this list, in the order
     * that they have been registered._
     *
     * **Note**: _This property is usually automatically defined and populated
     * by an {@link Injector}, and used to prevent duplicate concern injections._
     * 
     * @static
     * 
     * @type {ConcernConstructor[]}
     */
    [CONCERN_CLASSES]: ConcernConstructor[];

    /**
     * List of aliases applied in this target class.
     * 
     * **Note**: _This property is usually automatically defined and populated
     * by an {@link Injector}, and used to prevent alias conflicts._
     * 
     * @static
     *
     * @type {Alias[]}
     */
    [ALIASES]: Alias[];
}