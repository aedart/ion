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
     * The requested alias that conflicts with another alias
     * of the same name.
     *
     * @readonly
     *
     * @type {PropertyKey}
     */
    readonly alias: PropertyKey;

    /**
     * The source class that defines that originally defined the alias
     *
     * @readonly
     *
     * @type {ConstructorOrAbstractConstructor | UsesConcerns}
     */
    readonly source: ConstructorOrAbstractConstructor | UsesConcerns;
}