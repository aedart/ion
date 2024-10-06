import { Throwable } from "@aedart/contracts/support/exceptions";

/**
 * Configuration Resolve Exception
 * 
 * To be thrown whenever configuration [items]{@link import('@aedart/contracts/config').Items}
 * cannot be resolved.
 */
export default interface ResolveException extends Throwable
{}