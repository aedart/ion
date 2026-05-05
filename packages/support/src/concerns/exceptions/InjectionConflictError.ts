import { type ConstructorLike } from '@aedart/contracts';
import type { ConcernConflictException } from '@aedart/contracts/support/concerns';
import ConcernError from './ConcernError.js';

/**
 * Injection Conflict Error
 *
 * @see ConcernError
 * @see ConcernConflictException
 */
export default class InjectionConflictError extends ConcernError implements ConcernConflictException
{
    /**
     * The target class where the conflict occurred
     */
    readonly #target: ConstructorLike;

    /**
     * The property name that caused the conflict
     */
    readonly #key: PropertyKey;

    /**
     * Create a new Injection Conflict Error instance
     *
     * @param {ConstructorLike} target
     * @param {PropertyKey} key
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(target: ConstructorLike, key: PropertyKey, message?: string, options?: ErrorOptions)
    {
        super(message ?? 'Injection Conflict', options);

        this.#target = target;
        this.#key = key;
    }

    /**
     * The target class where the conflict occurred
     */
    public get target(): ConstructorLike {
        return this.#target;
    }

    /**
     * The property name that caused the conflict
     */
    public get key(): PropertyKey {
        return this.#key;
    }
}
