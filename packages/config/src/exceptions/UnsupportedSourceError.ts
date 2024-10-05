import type { UnsupportedSourceException } from "@aedart/contracts/config";
import { configureCustomError } from "@aedart/support/exceptions";
import ResolveError from "./ResolveError";

/**
 * Unsupported Configuration Source Error
 * 
 * @see {UnsupportedSourceException}
 */
export default class UnsupportedSourceError extends ResolveError implements UnsupportedSourceException
{
    /**
     * Create new Unsupported Source Error instance
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