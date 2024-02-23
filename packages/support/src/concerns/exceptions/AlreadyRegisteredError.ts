import type {
    AlreadyRegisteredException,
    ConcernConstructor,
    MustUseConcerns
} from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { configureCustomError } from "@aedart/support/exceptions";
import { getNameOrDesc } from "@aedart/support/reflections";
import { InjectionError } from "@aedart/support/concerns";

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
     * @type {ConstructorOrAbstractConstructor|MustUseConcerns}
     */
    readonly #source: ConstructorOrAbstractConstructor | MustUseConcerns;

    constructor(
        target: ConstructorOrAbstractConstructor | MustUseConcerns,
        concern: ConcernConstructor,
        source: ConstructorOrAbstractConstructor | MustUseConcerns,
        message?: string,
        options?: ErrorOptions
    ) {
        const resolved = message || `Concern ${getNameOrDesc(concern)} is already registered in class ${getNameOrDesc(target)} (via class ${getNameOrDesc(target)})`;

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
     * @returns {ConstructorOrAbstractConstructor | MustUseConcerns}
     */
    get source(): ConstructorOrAbstractConstructor | MustUseConcerns
    {
        return this.#source;
    }
}