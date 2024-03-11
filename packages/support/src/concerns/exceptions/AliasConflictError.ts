import type { ConstructorLike } from "@aedart/contracts";
import type { AliasConflictException, ConcernConstructor, UsesConcerns, Alias } from "@aedart/contracts/support/concerns";
import InjectionError from "./InjectionError";
import { getNameOrDesc } from "@aedart/support/reflections";
import { configureCustomError } from "@aedart/support/exceptions";

/**
 * Alias Conflict Error
 * 
 * @see AliasConflictException
 */
export default class AliasConflictError extends InjectionError implements AliasConflictException
{
    /**
     * The requested alias that conflicts with another alias
     * of the same name.
     *
     * @readonly
     * @private
     *
     * @type {Alias}
     */
    readonly #alias: Alias;

    /**
     * the property key that the conflicting alias points to
     *
     * @readonly
     * @private
     *
     * @type {PropertyKey}
     */
    readonly #key: PropertyKey;
    
    /**
     * The source class (e.g. parent class) that defines that originally defined the alias
     *
     * @readonly
     * @private
     *
     * @type {ConstructorLike | UsesConcerns}
     */
    readonly #source: ConstructorLike | UsesConcerns;

    /**
     * Create a new Alias Conflict Error instance
     * 
     * @param {ConstructorLike | UsesConcerns} target
     * @param {ConcernConstructor} concern
     * @param {Alias} alias
     * @param {PropertyKey} key
     * @param {ConstructorLike | UsesConcerns} source
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorLike | UsesConcerns,
        concern: ConcernConstructor,
        alias: Alias,
        key: PropertyKey,
        source: ConstructorLike | UsesConcerns,
        options?: ErrorOptions
    ) {
        const reason: string = (target === source)
            ? `Alias "${alias.toString()}" for property key "${key.toString()}" (concern ${getNameOrDesc(concern)}) conflicts with previous defined alias "${alias.toString()}", in target ${getNameOrDesc(target)}`
            : `Alias "${alias.toString()}" for property key "${key.toString()}" (concern ${getNameOrDesc(concern)}) conflicts with previous defined alias "${alias.toString()}" (defined in parent ${getNameOrDesc(source)}), in target ${getNameOrDesc(target)}`;
        super(target, concern, reason, options);

        configureCustomError(this);

        this.#alias = alias;
        this.#key = key;
        this.#source = source;

        // Force set the properties in the cause
        (this.cause as Record<PropertyKey, unknown>).alias = alias;
        (this.cause as Record<PropertyKey, unknown>).source = source;
    }
    
    /**
     * The requested alias that conflicts with another alias
     * of the same name.
     *
     * @readonly
     *
     * @type {Alias}
     */
    get alias(): Alias
    {
        return this.#alias;
    }

    /**
     * the property key that the conflicting alias points to
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    get key(): PropertyKey
    {
        return this.#key;
    }
    
    /**
     * The source class (e.g. parent class) that defines that originally defined the alias
     *
     * @readonly
     *
     * @type {ConstructorLike | UsesConcerns}
     */
    get source(): ConstructorLike | UsesConcerns
    {
        return this.#source;
    }
}