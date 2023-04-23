/**
 * Meta Decorator Target Context
 */
export default interface MetaTargetContext
{
    /**
     * The class that owns the meta
     */
    owner: object,

    /**
     * "This" argument
     */
    thisArg: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * The target class, field, method... that is being decorated
     */
    target: object,
}