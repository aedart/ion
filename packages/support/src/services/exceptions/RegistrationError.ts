import type { RegistrationException } from "@aedart/contracts/support/services";
import { configureCustomError } from "@aedart/support/exceptions";
import RegistrarError from "./RegistrarError";

/**
 * Service Provider Registration Error
 */
export default class RegistrationError extends RegistrarError implements RegistrationException
{
    /**
     * Create new Registration Error instance
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