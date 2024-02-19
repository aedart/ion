import type { Throwable } from "@aedart/contracts/support/exceptions";

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

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ArrayMergeError);
        } else {
            this.stack = (new Error()).stack;
        }

        this.name = "ArrayMergeError";
    }
}