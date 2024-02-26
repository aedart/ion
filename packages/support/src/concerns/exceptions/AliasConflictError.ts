import type {AliasConflictException, ConcernConstructor, UsesConcerns} from "@aedart/contracts/support/concerns";
import InjectionError from "./InjectionError";
import type {ConstructorOrAbstractConstructor} from "@aedart/contracts";
import {getNameOrDesc} from "@aedart/support/reflections";
import {configureCustomError} from "@aedart/support/exceptions";

export default class AliasConflictError extends InjectionError implements AliasConflictException
{
    /**
     * The requested alias
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly #alias: PropertyKey;

    /**
     * The alias that {@link alias} conflicts with
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly #conflictAlias: PropertyKey;

    /**
     * The source class that defines the {@link conflictAlias}
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
     * @param {PropertyKey} conflictsWithAlias
     * @param {ConstructorOrAbstractConstructor | UsesConcerns} source
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorOrAbstractConstructor | UsesConcerns,
        concern: ConcernConstructor,
        alias: PropertyKey,
        conflictsWithAlias: PropertyKey,
        source: ConstructorOrAbstractConstructor | UsesConcerns,
        options?: ErrorOptions
    ) {
        const reason: string = (target === source)
                ? `Alias "${alias.toString()}" conflicts with alias "${conflictsWithAlias.toString()}", in target ${getNameOrDesc(target)}`
                : `Alias "${alias.toString()}" conflicts with alias "${conflictsWithAlias.toString()}" (defined in source ${getNameOrDesc(source)}), in target ${getNameOrDesc(target)}`;
        super(target, concern, reason, options);

        configureCustomError(this);

        this.#alias = alias;
        this.#conflictAlias = conflictsWithAlias;
        this.#source = source;

        // Force set the properties in the cause
        (this.cause as Record<PropertyKey, unknown>).alias = alias;
        (this.cause as Record<PropertyKey, unknown>).conflictsWithAlias = conflictsWithAlias;
        (this.cause as Record<PropertyKey, unknown>).source = source;
    }
    
    /**
     * The requested alias
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
     * The alias that {@link alias} conflicts with
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    get conflictAlias(): PropertyKey
    {
        return this.#conflictAlias;
    }

    /**
     * The source class that defines the {@link conflictAlias}
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