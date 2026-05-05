import { type ConstructorLike } from '../../../types.js';
import ConcernException from './ConcernException.js';

/**
 * Concern Conflict Exception
 */
export default interface ConcernConflictException extends ConcernException {
    /**
     * The target class where the conflict occurred
     */
    readonly target: ConstructorLike;

    /**
     * The property name that caused the conflict
     */
    readonly key: PropertyKey;
}
