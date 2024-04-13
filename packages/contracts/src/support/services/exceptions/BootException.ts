import RegistrarException from "./RegistrarException";

/**
 * Service Provider Boot Exception
 * 
 * To be thrown whenever a service provider is unable to boot, or fails during booting attempt.
 */
export default interface BootException extends RegistrarException
{}