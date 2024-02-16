import type { Concern, NotRegisteredException } from "@aedart/contracts/support/concerns";
import type { Constructor } from "@aedart/contracts";
import ConcernError from './ConcernError';

/**
 * Concern Not Registered Error
 * 
 * @see NotRegisteredException
 */
export default class NotRegisteredError extends ConcernError implements NotRegisteredException
{
    /**
     * Create a new Concern Not Registered Error instance
     *
     * @param {Constructor<Concern>} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(concern: Constructor<Concern>, message: string, options?: ErrorOptions) {
        super(concern, message, options);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotRegisteredError);
        } else {
            this.stack = (new Error()).stack;
        }

        this.name = "NotRegisteredError";
    } 
}