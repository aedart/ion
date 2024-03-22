import type { NotFoundException } from "@aedart/contracts/container";
import ContainerError from "./ContainerError";

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
    }
}