import { Context } from './types';

/**
 * Meta Decorator Target Context
 */
export default interface MetaTargetContext
{
    /**
     * The class that owns the meta
     * 
     * @type {object}
     */
    owner: object;

    /**
     * "This" argument
     *
     * @type {any}
     */
    thisArg: any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * The target class, field, method... that is being decorated
     *
     * @type {object}
     */
    target: object;

    /**
     * Decorator context
     *
     * @type {Context}
     */
    context: Context;
}