import type { MergeException } from "@aedart/contracts/support/objects";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Merge Error
 * 
 * @see MergeException
 */
export default class MergeError extends Error implements MergeException
{
    /**
     * Create a new Merge Error instance
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