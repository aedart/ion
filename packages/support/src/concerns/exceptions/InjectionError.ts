import type { ConcernConstructor, InjectionException, MustUseConcerns } from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
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
     * @readonly
     *
     * @type {ConstructorOrAbstractConstructor|MustUseConcerns}
     */
    readonly #target: ConstructorOrAbstractConstructor | MustUseConcerns;

    /**
     * Create a new Injection Error instance
     * 
     * @param {ConstructorOrAbstractConstructor | MustUseConcerns} target
     * @param {ConcernConstructor} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorOrAbstractConstructor | MustUseConcerns,
        concern: ConcernConstructor,
        message: string,
        options?: ErrorOptions
    ) {
        super(concern, message, options);

        configureCustomError(this);

        this.#target = target;

        // Force set the target in the cause
        (this.cause as Record<PropertyKey, unknown>).target = target;
    }

    /**
     * The target class
     * 
     * @readonly
     * 
     * @returns {ConstructorOrAbstractConstructor | MustUseConcerns}
     */
    get target(): ConstructorOrAbstractConstructor | MustUseConcerns
    {
        return this.#target;
    }
}