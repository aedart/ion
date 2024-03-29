import type { ConcernException, ConcernConstructor } from "@aedart/contracts/support/concerns";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Concern Error
 * 
 * @see ConcernException
 */
export default class ConcernError extends Error implements ConcernException
{
    /**
     * The Concern class that caused this error or exception
     *
     * @private
     * 
     * @type {ConcernConstructor | null}
     */
    readonly #concern: ConcernConstructor | null

    /**
     * Create a new Concern Error instance
     *
     * @param {ConcernConstructor | null} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(concern: ConcernConstructor | null, message: string, options?: ErrorOptions)
    {
        super(message, options || { cause: {} });

        configureCustomError(this);

        this.#concern = concern;
        
        // Force set the concern in the cause (in case custom was provided)
        (this.cause as Record<PropertyKey, unknown>).concern = concern;
    }

    /**
     * The Concern class that caused this error or exception
     *
     * @readonly
     *
     * @type {ConcernConstructor | null}
     */
    get concern(): ConcernConstructor | null
    {
        return this.#concern;
    }
}