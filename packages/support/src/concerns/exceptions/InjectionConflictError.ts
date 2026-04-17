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
    readonly #target: object;

    /**
     * The property name that caused the conflict
     */
    readonly #key: PropertyKey;

    /**
     * Create a new Injection Conflict Error instance
     *
     * @param {object} target
     * @param {PropertyKey} key
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(target: object, key: PropertyKey, message?: string, options?: ErrorOptions)
    {
        super(message ?? 'Injection Conflict', options);
        
        this.#target = target;
        this.#key = key;
    }

    /**
     * The target class where the conflict occurred
     */
    public get target(): object
    {
        return this.#target;
    }

    /**
     * The property name that caused the conflict
     */
    public get key(): PropertyKey
    {
        return this.#key;
    }
}