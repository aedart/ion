import ConcernConstructor from '../ConcernConstructor.js';
import ConcernException from './ConcernException.js';

/**
 * Invalid Concern Exception
 */
export default interface InvalidConcernException extends ConcernException {
    /**
     * The invalid concern class
     */
    readonly concern: ConcernConstructor;
}
