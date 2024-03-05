import { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import InjectionException from "./InjectionException";
import UsesConcerns from "../UsesConcerns";
import { Alias } from '../types'

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
     * @type {Alias}
     */
    readonly alias: Alias;

    /**
     * the property key that the conflicting alias points to
     *
     * @readonly
     *
     * @type {Alias}
     */
    readonly key: PropertyKey;

    /**
     * The source class (e.g. parent class) that defines that originally defined the alias
     *
     * @readonly
     *
     * @type {ConstructorOrAbstractConstructor | UsesConcerns}
     */
    readonly source: ConstructorOrAbstractConstructor | UsesConcerns;
}