import type {
    AlreadyRegisteredException,
    ConcernConstructor,
    UsesConcerns
} from "@aedart/contracts/support/concerns";
import type { ConstructorLike } from "@aedart/contracts";
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
     * @type {ConstructorLike|UsesConcerns}
     *
     * @readonly
     * @protected
     */
    protected readonly _source: ConstructorLike | UsesConcerns;

    /**
     * Create a new "already registered" error instance
     * 
     * @param {ConstructorLike | UsesConcerns} target
     * @param {ConcernConstructor} concern
     * @param {ConstructorLike | UsesConcerns} source
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorLike | UsesConcerns,
        concern: ConcernConstructor,
        source: ConstructorLike | UsesConcerns,
        message?: string,
        options?: ErrorOptions
    ) {
        const resolved = message || (target === source)
            ? `Concern ${getNameOrDesc(concern)} is already registered in class ${getNameOrDesc(target)}`
            : `Concern ${getNameOrDesc(concern)} is already registered in class ${getNameOrDesc(target)} (via parent class ${getNameOrDesc(source)})`

        super(target, concern, resolved, options);

        configureCustomError(this);
        
        this._source = source;
        
        // Force set the source in the cause
        (this.cause as Record<PropertyKey, unknown>).source = source;
    }
    
    /**
     * The source, e.g. a parent class, in which a concern class
     * was already registered.
     *
     * @readonly
     *
     * @returns {ConstructorLike | UsesConcerns}
     */
    get source(): ConstructorLike | UsesConcerns
    {
        return this._source;
    }
}