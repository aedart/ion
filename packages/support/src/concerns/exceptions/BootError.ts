import type { BootException, ConcernConstructor } from "@aedart/contracts/support/concerns";
import ConcernError from "./ConcernError";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Concern Boot Error
 * 
 * @see BootException
 */
export default class BootError extends ConcernError implements BootException
{
    /**
     * Create a new Concern Boot Error instance
     * 
     * @param {ConcernConstructor} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(concern: ConcernConstructor, message: string, options?: ErrorOptions)
    {
        super(concern, message, options);

        configureCustomError(this);
    }
}