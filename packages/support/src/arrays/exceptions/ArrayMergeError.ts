import type { Throwable } from "@aedart/contracts/support/exceptions";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Array Merge Error
 *
 * To be thrown when two or more arrays are unable to be merged.
 */
export default class ArrayMergeError extends Error implements Throwable
{
    /**
     * Create a new Array Merge Error instance
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