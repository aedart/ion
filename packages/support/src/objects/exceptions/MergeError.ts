import type { MergeException } from "@aedart/contracts/support/objects";

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

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MergeError);
        } else {
            this.stack = (new Error()).stack;
        }

        this.name = "MergeError";
    }
}