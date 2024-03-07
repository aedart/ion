import { Throwable } from "@aedart/contracts/support/exceptions";

/**
 * Meta Exception
 * 
 * To be thrown when metadata cannot be obtained or written for an owner class
 */
export default interface MetaException extends Throwable {}