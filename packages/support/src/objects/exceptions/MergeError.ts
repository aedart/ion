import type { MergeException } from '@aedart/contracts/support/objects';
import BaseError from '../../exceptions/BaseError.js';

/**
 * Merge Error
 *
 * @see MergeException
 */
export default class MergeError extends BaseError implements MergeException
{
    /**
     * Create a new Merge Error instance
     *
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(message?: string, options?: ErrorOptions)
    {
        super(message, options);
    }
}
