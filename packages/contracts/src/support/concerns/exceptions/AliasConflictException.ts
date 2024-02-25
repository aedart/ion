import { InjectionException } from "@aedart/contracts/support/concerns";
import {ConstructorOrAbstractConstructor} from "@aedart/contracts";
import UsesConcerns from "../UsesConcerns";

/**
 * Alias Conflict Exception
 * 
 * To be thrown if an alias conflicts with another alias.
 */
export default interface AliasConflictException extends InjectionException
{
    /**
     * The requested alias
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly alias: PropertyKey;

    /**
     * The alias that {@link alias} conflicts with
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly conflictAlias: PropertyKey;

    /**
     * The source class that defines the {@link conflictAlias}
     *
     * @readonly
     *
     * @type {ConstructorOrAbstractConstructor | UsesConcerns}
     */
    readonly source: ConstructorOrAbstractConstructor | UsesConcerns;
}