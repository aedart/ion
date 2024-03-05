import type { Throwable } from "@aedart/contracts/support/exceptions";

/**
 * Merge Exception
 * 
 * To be thrown when two or more objects are unable to be merged.
 */
export default interface MergeException extends Throwable {}