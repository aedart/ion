import type { LoaderException } from "@aedart/contracts/config";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * @deprecated TODO: Rename this, e.g. Configuration Resolve Error
 * 
 * Configuration Loader Error
 * 
 * @see {LoaderException}
 */
export default class LoaderError extends Error implements LoaderException
{
    /**
     * Create new Configuration Loader Error instance
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