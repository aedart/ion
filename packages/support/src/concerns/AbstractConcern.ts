import type {
    Concern,
} from "@aedart/contracts/support/concerns";
import {
    HIDDEN,
    PROVIDES,
    ALWAYS_HIDDEN
} from "@aedart/contracts/support/concerns";
import { AbstractClassError } from "@aedart/support/exceptions";
import { classOwnKeys } from "@aedart/support/reflections";

/**
 * Abstract Concern
 * 
 * @see {Concern}
 * @see {ConcernConstructor}
 * 
 * @implements {Concern}
 * 
 * @abstract
 */
export default abstract class AbstractConcern implements Concern
{
    /**
     * The owner class instance this concern is injected into,
     * or `this` concern instance.
     * 
     * @readonly
     * @private
     * 
     * @type {object}
     */
    readonly #concernOwner: object;

    /**
     * Creates a new concern instance
     *
     * @param {object} [owner] The owner class instance this concern is injected into.
     *                         Defaults to `this` concern instance if none given.
     *
     * @throws {Error} When concern is unable to preform initialisation, e.g. caused
     *                 by the owner or other circumstances.
     */
    public constructor(owner?: object)
    {
        if (new.target === AbstractConcern) {
            throw new AbstractClassError(AbstractConcern);
        }
        
        this.#concernOwner = owner || this;
    }

    /**
     * The owner class instance this concern is injected into,
     * or `this` concern instance if no owner was set.
     *
     * @readonly
     * 
     * @type {object}
     */
    public get concernOwner(): object
    {
        return this.#concernOwner;
    }

    /**
     * @deprecated TODO: This must be removed again... To be replaced by [PROPERTIES]...
     * 
     * Returns a list of properties and methods that MUST NOT be aliased into the target class.
     * 
     * **Warning**: _Regardless of what properties and methods this method may return,
     * an "injector" that injects this concern MUST ensure that the {@link ALWAYS_HIDDEN}
     * defined properties and methods are **NEVER** aliased into a target class._
     * 
     * @return {ReadonlyArray<PropertyKey>}
     */
    static [HIDDEN](): ReadonlyArray<PropertyKey>
    {
        return ALWAYS_HIDDEN;
    }

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
    public static [PROVIDES](): PropertyKey[]
    {
        // Feel free to overwrite this static method in your concern class and specify
        // the properties and methods that your concern offers (those that can be aliased).
        
        return classOwnKeys(this, true);
    }
}