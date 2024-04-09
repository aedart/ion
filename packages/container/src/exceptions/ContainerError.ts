import type { ContainerException } from "@aedart/contracts/container";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Container Error
 * 
 * @see ContainerException
 */
export default class ContainerError extends Error implements ContainerException
{
    /**
     * Create new Container Error instance
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