import type { ResolveException } from "@aedart/contracts/config";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Configuration Resolve Error
 * 
 * @see {ResolveException}
 */
export default class ResolveError extends Error implements ResolveException
{
    /**
     * Create new Resolve Error instance
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