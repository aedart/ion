import type { MetaException } from "@aedart/contracts/support/meta";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Meta Error
 * 
 * @see MetaException
 */
export default class MetaError extends Error implements MetaException
{
    /**
     * Create a new Meta Error instance
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