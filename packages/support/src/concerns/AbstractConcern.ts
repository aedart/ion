import type { Concern } from "@aedart/contracts/support/concerns";
import { HIDDEN, ALWAYS_HIDDEN } from "@aedart/contracts/support/concerns";

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
     * The target class instance this concern is injected into
     * 
     * @private
     * @type {object}
     */
    readonly #concernOwner: object;

    /**
     * Creates a new concern instance
     *
     * @protected
     * @param {object} owner The target class instance this concern is injected into
     *
     * @throws {Error} When concern is unable to preform initialisation, e.g. caused
     *                 by the owner or other circumstances.
     */
    protected constructor(owner: object)
    {
        if (new.target === AbstractConcern) {
            throw new Error('Unable to instantiate new instance of abstract class');
        }
        
        this.#concernOwner = owner;
    }

    /**
     * @inheritdoc
     */
    get concernOwner(): object
    {
        return this.#concernOwner;
    }

    /**
     * Returns a list of properties and methods that MUST NOT be aliased into the target class.
     * 
     * **Warning**: _Regardless of what properties and methods this method may return,
     * an "injector" component that applies this concern MUST ensure that the {@link ALWAYS_HIDDEN}
     * defined properties and methods are **NEVER** aliased into a target class._
     * 
     * @return {PropertyKey[]}
     */
    static [HIDDEN](): PropertyKey[]
    {
        return ALWAYS_HIDDEN as PropertyKey[];
    }
}