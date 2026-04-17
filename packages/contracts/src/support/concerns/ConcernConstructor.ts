import Concern from './Concern.js';
import { CONCERN_CLASS } from "./types.js";

/**
 * Concern Constructor
 * 
 * @see Concern
 */
export default interface ConcernConstructor<T extends Concern = Concern>
{
    /**
     * Identification tag to distinguish concerns from regular classes.
     */
    readonly [CONCERN_CLASS]: boolean;

    /**
     * Concern Constructor
     */
    new (): T;
}