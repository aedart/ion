import ConcernException from './ConcernException';

/**
 * Concern Not Registered Exception
 * 
 * To be thrown when a given concern is expected registered in a [Container]{@link import('@aedart/contracts/support/concerns').Container},
 * but isn't.
 * 
 * @see ConcernException
 */
export default interface NotRegisteredException extends ConcernException {}