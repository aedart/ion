import type { BootException } from "@aedart/contracts/support/services";
import { configureCustomError } from "@aedart/support/exceptions";
import RegistrarError from "./RegistrarError";

/**
 * Service Provider Boot Error
 */
export default class BootError extends RegistrarError implements BootException
{
    /**
     * Create new Boot Error instance
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