import type { Throwable } from '@aedart/contracts/support/exceptions';

/**
 * Base Error
 *
 * Provides standardized configuration for all custom exceptions in the monorepo.
 *
 * @abstract
 */
export default abstract class BaseError extends Error implements Throwable
{
    /**
     * Create a new error instance
     *
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(message?: string, options?: ErrorOptions)
    {
        // 1. Native Error initialization (handles 'cause' in Node 16.9+ / Modern Browsers)
        super(message, options);

        // 2. Automatically set the name to the class name (e.g., "AbstractClassError")
        // This eliminates the need for manual name assignment in subclasses.
        this.name = this.constructor.name;

        // 3. Optimized Stack Trace Capture
        // V8 (Node/Chrome) provides captureStackTrace to hide the constructor from the trace.
        // @ts-expect-error Existence of captureStackTrace is being checked here.
        if (typeof Error.captureStackTrace === 'function') {
            // @ts-expect-error Error.captureStackTrace should exist here
            Error.captureStackTrace(this, this.constructor);
        }

        // Non-V8 (Safari/Firefox) automatically creates the stack during super().
        // No manual (new Error()).stack assignment needed, reducing GC pressure.
    }
}
