import type { CircularDependencyException } from "@aedart/contracts/container";
import ContainerError from "./ContainerError";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Circular Dependency Error
 */
export default class CircularDependencyError extends ContainerError implements CircularDependencyException
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