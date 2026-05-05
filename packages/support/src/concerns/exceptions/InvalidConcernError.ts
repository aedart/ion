import type {
    ConcernConstructor,
    InvalidConcernException,
} from '@aedart/contracts/support/concerns';
import ConcernError from './ConcernError.js';

/**
 * Invalid Concern Error
 *
 * Thrown when a class is provided to the @use() decorator that does not
 * implement the Concern interface or is not marked as a valid concern.
 */
export default class InvalidConcernError extends ConcernError implements InvalidConcernException
{
    /**
     * The invalid concern class
     */
    readonly #concern: ConcernConstructor;

    /**
     * Create a new Invalid Concern Error instance
     *
     * @param {ConcernConstructor} concern
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(concern: ConcernConstructor, message?: string, options?: ErrorOptions)
    {
        super(message ?? 'Invalid Concern', options);

        this.#concern = concern;
    }

    /**
     * The invalid concern class
     */

    /**
     * The invalid concern class
     *
     * @returns {ConcernConstructor}
     */
    public get concern(): ConcernConstructor {
        return this.#concern;
    }
}
