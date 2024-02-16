import type { Throwable } from "@aedart/contracts/support/exceptions";

/**
 * Logical Error
 * 
 * To be thrown whenever there is an error in the programming logic.
 * 
 * This error is inspired by PHP's [`LogicException`]{@link https://www.php.net/manual/en/class.logicexception}
 */
export default class LogicalError extends Error implements Throwable
{
    /**
     * Create a new logical error instance
     * 
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, LogicalError);
        } else {
            this.stack = (new Error()).stack;    
        }

        this.name = "LogicalError";
    }
}