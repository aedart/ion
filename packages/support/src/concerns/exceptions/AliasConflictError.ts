import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import type { AliasConflictException, ConcernConstructor, UsesConcerns } from "@aedart/contracts/support/concerns";
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
     *
     * @type {PropertyKey}
     */
    readonly #alias: PropertyKey;

    /**
     * The source class that defines that originally defined the alias
     *
     * @readonly
     *
     * @type {ConstructorOrAbstractConstructor | UsesConcerns}
     */
    readonly #source: ConstructorOrAbstractConstructor | UsesConcerns;

    /**
     * Create a new Alias Conflict Error instance
     * 
     * @param {ConstructorOrAbstractConstructor | UsesConcerns} target
     * @param {ConcernConstructor} concern
     * @param {PropertyKey} alias
     * @param {ConstructorOrAbstractConstructor | UsesConcerns} source
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorOrAbstractConstructor | UsesConcerns,
        concern: ConcernConstructor,
        alias: PropertyKey,
        source: ConstructorOrAbstractConstructor | UsesConcerns,
        options?: ErrorOptions
    ) {
        const reason: string = (target === source)
                ? `Alias "${alias.toString()}" conflicts with alias "${alias.toString()}", in target ${getNameOrDesc(target)}`
                : `Alias "${alias.toString()}" conflicts with alias "${alias.toString()}" (defined in source ${getNameOrDesc(source)}), in target ${getNameOrDesc(target)}`;
        super(target, concern, reason, options);

        configureCustomError(this);

        this.#alias = alias;
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
     * @type {PropertyKey}
     */
    get alias(): PropertyKey
    {
        return this.#alias;
    }

    /**
     * The source class that defines that originally defined the alias
     *
     * @readonly
     *
     * @type {ConstructorOrAbstractConstructor | UsesConcerns}
     */
    get source(): ConstructorOrAbstractConstructor | UsesConcerns
    {
        return this.#source;
    }
}