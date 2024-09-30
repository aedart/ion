import { Throwable } from "@aedart/contracts/support/exceptions";

/**
 * Application Exception
 * 
 * General exception to be thrown when application fails to be configured, bootstrapped, booted or run.
 */
export default interface ApplicationException extends Throwable
{}