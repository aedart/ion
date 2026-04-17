import { type AlreadyAppliedException } from '@aedart/contracts/support/concerns';
import InvalidConcernError from './InvalidConcernError.js'

/**
 * Already Applied Error
 *
 * Thrown when a concern is applied to a target that already uses it.
 */
export default class AlreadyAppliedError extends InvalidConcernError implements AlreadyAppliedException
{
    /**
     * The target class where the conflict occurred
     */
    readonly #target: object;
    
    /**
     * Create a new Already Applied Error instance
     *
     * @param {any} target
     * @param {ConcernConstructor} concern
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(target: any, concern: any, message?: string, options?: ErrorOptions)
    {
        super(concern, message ?? 'Concern Already Applied', options);

        this.#target = target;
    }

    /**
     * The target class where the conflict occurred
     */
    public get target(): object
    {
        return this.#target;
    }
}
