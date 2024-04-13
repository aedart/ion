import type { RegistrarException } from "@aedart/contracts/support/services";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Registrar Error
 */
export default class RegistrarError extends Error implements RegistrarException
{
    /**
     * Create new Registrar Error instance
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