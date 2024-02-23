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
     * @type {ConcernConstructor}
     */
    readonly #concern: ConcernConstructor

    /**
     * Create a new Concern Error instance
     *
     * @param {ConcernConstructor} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(concern: ConcernConstructor, message: string, options?: ErrorOptions)
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
     * @type {ConcernConstructor}
     */
    get concern(): ConcernConstructor
    {
        return this.#concern;
    }
}