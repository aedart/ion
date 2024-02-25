import type { ConcernConstructor, InjectionException, UsesConcerns } from "@aedart/contracts/support/concerns";
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
     * @type {ConstructorOrAbstractConstructor|UsesConcerns}
     */
    readonly #target: ConstructorOrAbstractConstructor | UsesConcerns;

    /**
     * Create a new Injection Error instance
     * 
     * @param {ConstructorOrAbstractConstructor | UsesConcerns} target
     * @param {ConcernConstructor | null} concern
     * @param {string} message
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorOrAbstractConstructor | UsesConcerns,
        concern: ConcernConstructor | null,
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
     * @returns {ConstructorOrAbstractConstructor | UsesConcerns}
     */
    get target(): ConstructorOrAbstractConstructor | UsesConcerns
    {
        return this.#target;
    }
}