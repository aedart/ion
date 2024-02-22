import type { Concern } from "@aedart/contracts/support/concerns";
import { HIDDEN, ALWAYS_HIDDEN } from "@aedart/contracts/support/concerns";
import { AbstractClassError } from "@aedart/support/exceptions";

/**
 * Abstract Concern
 * 
 * @see {Concern}
 * @implements {Concern}
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
}