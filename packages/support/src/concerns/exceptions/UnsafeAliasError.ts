import type {
    ConcernConstructor,
    UsesConcerns, UnsafeAliasException
} from "@aedart/contracts/support/concerns";
import type { ConstructorLike } from "@aedart/contracts";
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
     * @type {PropertyKey}
     * 
     * @protected
     * @readonly
     */
    protected readonly _alias: PropertyKey;

    /**
     * The "unsafe" property or method that an alias points to
     *
     * @type {PropertyKey}
     * 
     * @protected
     * @readonly
     */
    protected readonly _key: PropertyKey;
    
    /**
     * Create a new Unsafe Alias Error instance
     *
     * @param {ConstructorLike | UsesConcerns} target
     * @param {ConcernConstructor} concern
     * @param {PropertyKey} alias
     * @param {PropertyKey} key
     * @param {string} [message]
     * @param {ErrorOptions} [options]
     */
    constructor(
        target: ConstructorLike | UsesConcerns,
        concern: ConcernConstructor,
        alias: PropertyKey,
        key: PropertyKey,
        message?: string,
        options?: ErrorOptions
    ) {
        const reason: string = message || `Alias "${alias.toString()}" in target ${getNameOrDesc(target)} points to unsafe property or method: "${key.toString()}", in concern ${getNameOrDesc(concern)}.`;
        super(target, concern, reason, options);

        configureCustomError(this);

        this._alias = alias;
        this._key = key;

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
        return this._alias;
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
        return this._key;
    }
}