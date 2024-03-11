import { InjectionException } from "@aedart/contracts/support/concerns";
import { ConstructorLike } from "@aedart/contracts";
import UsesConcerns from "../UsesConcerns";

/**
 * Already Registered Exception
 * 
 * To be thrown when a concern class is attempted registered in a target, but
 * was previously registered in the target or target's parent.
 */
export default interface AlreadyRegisteredException extends InjectionException
{
    /**
     * The source, e.g. a parent class, in which a concern class
     * was already registered.
     *
     * @readonly
     *
     * @type {ConstructorLike | UsesConcerns}
     */
    readonly source: ConstructorLike | UsesConcerns;
}