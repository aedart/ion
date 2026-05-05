import ConcernException from './ConcernException.js';
import ConcernConstructor from "../ConcernConstructor.js";

/**
 * Invalid Concern Exception
 */
export default interface InvalidConcernException extends ConcernException
{
    readonly name: string;
    
    /**
     * The invalid concern class
     */
    readonly concern: ConcernConstructor;
}
