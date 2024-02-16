import type { BootException, Concern } from "@aedart/contracts/support/concerns";
import type { Constructor} from "@aedart/contracts";
import ConcernError from "./ConcernError";

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
     * @param {Constructor<Concern>} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(concern: Constructor<Concern>, message: string, options?: ErrorOptions) {
        super(concern, message, options);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BootError);
        } else {
            this.stack = (new Error()).stack;
        }

        this.name = "BootError";
    }
}