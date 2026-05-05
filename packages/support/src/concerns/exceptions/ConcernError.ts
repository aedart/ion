import type { ConcernException } from '@aedart/contracts/support/concerns';
import BaseError from '../../exceptions/BaseError.js';

/**
 * Concern Error
 */
export default class ConcernError extends BaseError implements ConcernException
{
    /**
     * @inheritdoc
     */
    constructor(message?: string, options?: ErrorOptions)
    {
        super(message, options);
    }
}
