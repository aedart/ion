import { Throwable } from "@aedart/contracts/support/exceptions";

/**
 * Service Registrar Exception
 * 
 * General exception to be thrown when unable to register, boot or resolve service providers
 */
export default interface RegistrarException extends Throwable
{}