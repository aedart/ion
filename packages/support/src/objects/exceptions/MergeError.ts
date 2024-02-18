import type { Throwable } from "@aedart/contracts/support/exceptions";

/**
 * Merge Error
 * 
 * To be thrown when two or more objects are unable to be merged.
 */
export default class MergeError extends Error implements Throwable
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

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MergeError);
        } else {
            this.stack = (new Error()).stack;
        }

        this.name = "MergeError";
    }
}