import type { Throwable } from "@aedart/contracts/support/exceptions";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Write Error
 * 
 * To be thrown when unable to write an environment variable.
 */
export default class WriteError extends Error implements Throwable
{
    /**
     * Create a new Write Error instance
     *
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(message: string, options?: ErrorOptions)
    {
        super(message, options);

        configureCustomError(this);
    }
}