import type {
    ConcernConstructor,
    MustUseConcerns, UnsafeAliasException
} from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { configureCustomError } from "@aedart/support/exceptions";
import InjectionError from "./InjectionError";
import {getNameOrDesc} from "@aedart/support/reflections";

/**
 * Unsafe Alias Error
 */
export default class UnsafeAliasError extends InjectionError implements UnsafeAliasException
{
    /**
     * The alias that points to an "unsafe" property or method
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly #alias: PropertyKey;

    /**
     * The "unsafe" property or method that an alias points to
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly #key: PropertyKey;
    
    /**
     * Create a new Unsafe Alias Error instance
     *
     * @param {ConstructorOrAbstractConstructor | MustUseConcerns} target
     * @param {ConcernConstructor} concern
     * @param {PropertyKey} alias
     * @param {PropertyKey} key
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorOrAbstractConstructor | MustUseConcerns,
        concern: ConcernConstructor,
        alias: PropertyKey,
        key: PropertyKey,
        message?: string,
        options?: ErrorOptions
    ) {
        const reason: string = message || `Alias ${alias.toString()} points to "unsafe" property or method ${key.toString()} in concern ${getNameOrDesc(concern)}, in target ${getNameOrDesc(target)}`;
        super(target, concern, reason, options);

        configureCustomError(this);

        this.#alias = alias;
        this.#key = key;

        // Force set the key and alias in the cause
        (this.cause as Record<PropertyKey, unknown>).alias = alias;
        (this.cause as Record<PropertyKey, unknown>).key = key;
    }

    /**
     * The alias that points to an "unsafe" property or method
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
     * The "unsafe" property or method that an alias points to
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    get key(): PropertyKey
    {
        return this.#key;
    }
}