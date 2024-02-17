import { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import ConcernException from "./ConcernException";
import MustUseConcerns from "../MustUseConcerns";

/**
 * Concern Injection Exception
 * 
 * To be thrown when a concern class cannot be injected into a target class.
 */
export default interface InjectionException extends ConcernException
{
    /**
     * The target class
     * 
     * @readonly
     * 
     * @type {ConstructorOrAbstractConstructor|MustUseConcerns}
     */
    readonly target: ConstructorOrAbstractConstructor | MustUseConcerns;
}