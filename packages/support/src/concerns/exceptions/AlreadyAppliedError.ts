import type { ConstructorLike } from '@aedart/contracts';
import {
    type AlreadyAppliedException,
    type ConcernConstructor,
} from '@aedart/contracts/support/concerns';
import InvalidConcernError from './InvalidConcernError.js';

/**
 * Already Applied Error
 *
 * Thrown when a concern is applied to a target that already uses it.
 */
export default class AlreadyAppliedError extends InvalidConcernError
    implements AlreadyAppliedException
{
    /**
     * The target class where the conflict occurred
     */
    readonly #target: ConstructorLike;

    /**
     * Create a new Already Applied Error instance
     *
     * @param {ConstructorLike} target
     * @param {ConcernConstructor} concern
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorLike,
        concern: ConcernConstructor,
        message?: string,
        options?: ErrorOptions,
    )
    {
        super(concern, message ?? 'Concern Already Applied', options);

        this.#target = target;
    }

    /**
     * The target class where the conflict occurred
     */
    public get target(): ConstructorLike {
        return this.#target;
    }
}
