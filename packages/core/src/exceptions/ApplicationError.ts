import type { ApplicationException } from "@aedart/contracts/core";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Application Error
 */
export default class ApplicationError extends Error implements ApplicationException
{
    /**
     * Create new Application Error instance
     *
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(message?: string, options?: ErrorOptions)
    {
        super(message, options);

        configureCustomError(this);
    }
}