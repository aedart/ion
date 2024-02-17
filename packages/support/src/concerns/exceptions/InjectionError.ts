import ConcernError from "./ConcernError";
import { Concern, InjectionException, MustUseConcerns } from "@aedart/contracts/support/concerns";
import type { Constructor, ConstructorOrAbstractConstructor } from "@aedart/contracts";

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
     * @param {Constructor<Concern>} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorOrAbstractConstructor | MustUseConcerns,
        concern: Constructor<Concern>,
        message: string,
        options?: ErrorOptions
    ) {
        super(concern, message, options);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ConcernError);
        } else {
            this.stack = (new Error()).stack;
        }

        this.name = "InjectionError";
        this.#target = target;

        // Force set the target in the cause
        this.cause.target = target;
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