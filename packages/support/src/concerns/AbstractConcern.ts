import type { Concern } from '@aedart/contracts/support/concerns';
import { CONCERN_CLASS } from '@aedart/contracts/support/concerns';
import AbstractClassError from '../exceptions/AbstractClassError.js';

/**
 * Abstract Concern
 *
 * @abstract
 *
 * @see Concern
 */
export default abstract class AbstractConcern implements Concern
{
    /**
     * @inheritdoc
     */
    static readonly [CONCERN_CLASS]: boolean = true;

    /**
     * @inheritdoc
     */
    constructor()
    {
        if (new.target === AbstractConcern) {
            throw new AbstractClassError(AbstractConcern);
        }
    }
}
