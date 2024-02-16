import { Throwable } from "@aedart/contracts/support/exceptions";
import { Constructor } from "@aedart/contracts";
import Concern from "../Concern";

/**
 * Concern Exception
 * 
 * To be thrown when a concern class is the cause of an error.
 */
export default interface ConcernException extends Throwable {

    /**
     * The Concern class that caused this error or exception
     * 
     * @readonly
     * 
     * @type {Constructor<Concern>}
     */
    readonly concern: Constructor<Concern>
}