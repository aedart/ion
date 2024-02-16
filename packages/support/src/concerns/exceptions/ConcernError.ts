import type { ConcernException, Concern } from "@aedart/contracts/support/concerns";
import type { Constructor } from "@aedart/contracts";

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
     * @type {Constructor<Concern>|undefined}
     */
    readonly #concern: Constructor<Concern>

    /**
     * Create a new Concern Error instance
     *
     * @param {Constructor<Concern>} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(concern: Constructor<Concern>, message: string, options?: ErrorOptions) {
        super(
            message,
            Object.assign(
                Object.create(null), 
                options || {}, 
                { cause: { concern: concern } }
            )
        );

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ConcernError);
        } else {
            this.stack = (new Error()).stack;
        }

        this.name = "ConcernError";
        this.#concern = concern;
    }

    /**
     * The Concern class that caused this error or exception
     *
     * @readonly
     *
     * @type {Constructor<Concern>}
     */
    get concern(): Constructor<Concern> {
        return this.#concern;
    }
}