import type { ArrayMergeException } from '@aedart/contracts/support/arrays';
import BaseError from '../../exceptions/BaseError.js';

/**
 * Array Merge Error
 *
 * To be thrown when two or more arrays are unable to be merged.
 */
export default class ArrayMergeError extends BaseError implements ArrayMergeException
{
    /**
     * Create a new Array Merge Error instance
     *
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(message?: string, options?: ErrorOptions)
    {
        super(message, options);
    }
}
