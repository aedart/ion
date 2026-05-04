import ConcernException from './ConcernException.js';

/**
 * Invalid Concern Exception
 */
export default interface InvalidConcernException extends ConcernException
{
    readonly name: string;
    
    /**
     * The invalid concern class
     */
    readonly concern: any;
}
