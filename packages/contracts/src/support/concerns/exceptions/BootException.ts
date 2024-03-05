import ConcernException from './ConcernException'

/**
 * Concern Boot Exception
 * 
 * To be thrown when a concern class is unable to boot.
 * 
 * @see ConcernException
 */
export default interface BootException extends ConcernException {}