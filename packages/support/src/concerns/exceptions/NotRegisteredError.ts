import type { Concern, NotRegisteredException } from "@aedart/contracts/support/concerns";
import type { Constructor } from "@aedart/contracts";
import ConcernError from './ConcernError';
import { getNameOrDesc } from "@aedart/support/reflections";
import { configureCustomError } from "@aedart/support/exceptions";

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
     * @param {ErrorOptions} [options]
     */
    constructor(concern: Constructor<Concern>, options?: ErrorOptions)
    {
        super(concern, `Concern ${getNameOrDesc(concern)} is not registered in concerns container`, options);

        configureCustomError(this);
    } 
}