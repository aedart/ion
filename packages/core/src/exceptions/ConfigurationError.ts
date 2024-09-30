import type { ConfigurationException } from "@aedart/contracts/core";
import { configureCustomError } from "@aedart/support/exceptions";
import ApplicationError from "./ApplicationError";

/**
 * Application Configuration Error
 */
export default class ConfigurationError extends ApplicationError implements ConfigurationException
{
    /**
     * Create new Configuration Error instance
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