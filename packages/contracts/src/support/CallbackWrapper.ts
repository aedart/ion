import { Callback } from "@aedart/contracts";

/**
 * Callback Wrapper
 */
export default interface CallbackWrapper
{
    /**
     * The callback
     * 
     * @type {Callback}
     * 
     * @readonly
     */
    readonly callback: Callback;

    /**
     * "This" value that callback is bound to
     *
     * @type {object | undefined}
     *
     * @readonly
     */
    readonly binding: object | undefined;
    
    /**
     * Arguments to be passed on to the callback
     * when invoked.
     * 
     * @type {any[]}
     */
    arguments: any[]; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Add arguments to be passed on to the callback
     * when it is invoked.
     *
     * @param {...any} args
     *
     * @return {this}
     */
    with(...args: any[]): this; /* eslint-disable-line @typescript-eslint/no-explicit-any */
    
    /**
     * Determine if callback has any arguments
     * 
     * @return {boolean}
     */
    hasArguments(): boolean;

    /**
     * Bind callback to given "this" value
     * 
     * @param {object} thisArg
     * 
     * @return {this}
     * 
     * @throws {TypeError}
     */
    bind(thisArg: object): this;
    
    /**
     * Invoke the callback
     * 
     * @return {any}
     *
     * @throws {Error}
     */
    call(): any; /* eslint-disable-line @typescript-eslint/no-explicit-any */
}