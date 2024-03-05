import type {
    AlreadyRegisteredException,
    ConcernConstructor,
    UsesConcerns
} from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { configureCustomError } from "@aedart/support/exceptions";
import { getNameOrDesc } from "@aedart/support/reflections";
import InjectionError from "./InjectionError";

/**
 * Already Registered Error
 * 
 * @see AlreadyRegisteredException
 */
export default class AlreadyRegisteredError extends InjectionError implements AlreadyRegisteredException
{
    /**
     * The source, e.g. a parent class, in which a concern class
     * was already registered.
     *
     * @readonly
     * @private
     *
     * @type {ConstructorOrAbstractConstructor|UsesConcerns}
     */
    readonly #source: ConstructorOrAbstractConstructor | UsesConcerns;

    constructor(
        target: ConstructorOrAbstractConstructor | UsesConcerns,
        concern: ConcernConstructor,
        source: ConstructorOrAbstractConstructor | UsesConcerns,
        message?: string,
        options?: ErrorOptions
    ) {
        const resolved = message || (target === source)
            ? `Concern ${getNameOrDesc(concern)} is already registered in class ${getNameOrDesc(target)}`
            : `Concern ${getNameOrDesc(concern)} is already registered in class ${getNameOrDesc(target)} (via parent class ${getNameOrDesc(source)})`

        super(target, concern, resolved, options);

        configureCustomError(this);
        
        this.#source = source;
        
        // Force set the source in the cause
        (this.cause as Record<PropertyKey, unknown>).source = source;
    }
    
    /**
     * The source, e.g. a parent class, in which a concern class
     * was already registered.
     *
     * @readonly
     *
     * @returns {ConstructorOrAbstractConstructor | UsesConcerns}
     */
    get source(): ConstructorOrAbstractConstructor | UsesConcerns
    {
        return this.#source;
    }
}