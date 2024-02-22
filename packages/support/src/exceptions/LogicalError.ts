import type { Throwable } from "@aedart/contracts/support/exceptions";
import { configureCustomError } from "./configureCustomError";

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

        configureCustomError(this);
    }
}