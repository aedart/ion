import type { NotFoundException } from "@aedart/contracts/container";
import ContainerError from "./ContainerError";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Not Found Error
 * 
 * @see NotFoundException
 */
export default class NotFoundError extends ContainerError implements NotFoundException
{
    /**
     * Create new Not Found Error instance
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