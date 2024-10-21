import type { Throwable } from "@aedart/contracts/support/exceptions";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Skip Process Exit Error
 */
export default class SkipProcessExitError extends Error implements Throwable
{
    /**
     * Create new Skip Process Exit Error instance
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