import type { ConcernConstructor, InjectionException, UsesConcerns } from "@aedart/contracts/support/concerns";
import type { ConstructorLike } from "@aedart/contracts";
import { configureCustomError } from "@aedart/support/exceptions";
import ConcernError from "./ConcernError";

/**
 * Injection Error
 * 
 * @see InjectionException
 */
export default class InjectionError extends ConcernError implements InjectionException
{
    /**
     * The target class
     *
     * @type {ConstructorLike|UsesConcerns}
     * 
     * @protected
     * @readonly
     */
    protected readonly _target: ConstructorLike | UsesConcerns;

    /**
     * Create a new Injection Error instance
     * 
     * @param {ConstructorLike | UsesConcerns} target
     * @param {ConcernConstructor | null} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorLike | UsesConcerns,
        concern: ConcernConstructor | null,
        message: string,
        options?: ErrorOptions
    ) {
        super(concern, message, options);

        configureCustomError(this);

        this._target = target;

        // Force set the target in the cause
        (this.cause as Record<PropertyKey, unknown>).target = target;
    }

    /**
     * The target class
     * 
     * @readonly
     * 
     * @returns {ConstructorLike | UsesConcerns}
     */
    get target(): ConstructorLike | UsesConcerns
    {
        return this._target;
    }
}