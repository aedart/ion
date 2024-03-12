import type { Callback } from "@aedart/contracts";
import type { CallbackWrapper as CallbackWrapperInterface } from "@aedart/contracts/support";

/**
 * Callback Wrapper
 * 
 * @see [CallbackWrapper]{@link import('@aedart/contracts/support').CallbackWrapper}
 */
export default class CallbackWrapper implements CallbackWrapperInterface
{
    /**
     * The callback
     *
     * @type {Callback}
     *
     * @private
     * @readonly
     */
    readonly #callback: Callback;

    /**
     * "This" value that callback is bound to
     *
     * @type {object | undefined}
     *
     * @readonly
     * @private
     */
    #binding: object | undefined = undefined;

    /**
     * Arguments to be passed on to the callback
     * when invoked.
     *
     * @type {any[]}
     * 
     * @private
     */
    #arguments: any[] = []; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Create a new Callback Wrapper instance
     * 
     * @param {Callback} callback
     * @param {...any} [args]
     * 
     * @throws {TypeError}
     */
    constructor(
        callback: Callback,
        ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ) {
        if (typeof callback != 'function') {
            throw new TypeError('Argument must be a valid callable function');
        }
        
        this.#callback = callback;
        this.with(...args);
    }

    /**
     * Create a new Callback Wrapper instance
     *
     * @param {Callback} callback
     * @param {...any} [args]
     *
     * @return {this|CallbackWrapper}
     * 
     * @throws {TypeError}
     */
    public static make(
        callback: Callback,
        ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): CallbackWrapperInterface
    {
        return new this(callback, ...args);
    }

    /**
     * Create a new Callback Wrapper instance, using given binding
     * 
     * @param {object} thisArg Binding
     * @param {Callback} callback
     * @param {...any} [args]
     *
     * @return {this|CallbackWrapper}
     *
     * @throws {TypeError}
     */
    public static makeFor(
        thisArg: object,
        callback: Callback,
        ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): CallbackWrapperInterface
    {
        return this.make(callback, ...args).bind(thisArg);
    }
    
    /**
     * The callback
     *
     * @type {Callback}
     *
     * @readonly
     */
    public get callback(): Callback
    {
        return this.#callback;
    }

    /**
     * "This" value that callback is bound to
     *
     * @type {object | undefined}
     *
     * @readonly
     */
    public get binding(): object | undefined
    {
        return this.#binding;
    }

    /**
     * Arguments to be passed on to the callback
     * when invoked.
     *
     * @param {any[]} args
     */
    public set arguments(args: any[]) /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.#arguments = args;
    }

    /**
     * Arguments to be passed on to the callback
     * when invoked.
     *
     * @return {any[]}
     */
    public get arguments(): any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        return this.#arguments;
    }
    
    /**
     * Add arguments to be passed on to the callback
     * when it is invoked.
     *
     * @param {...any} args
     *
     * @return {this}
     */
    public with(...args: any[]): this /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.arguments = this.arguments.concat(...args);

        return this;
    }

    /**
     * Determine if callback has any arguments
     *
     * @return {boolean}
     */
    public hasArguments(): boolean
    {
        return this.arguments.length !== 0;
    }

    /**
     * Bind callback to given "this" value
     *
     * @param {object} thisArg
     *
     * @return {this}
     *
     * @throws {TypeError}
     */
    public bind(thisArg: object): this
    {
        this.#binding = thisArg;

        return this;
    }

    /**
     * Determine if a binding has been set
     *
     * @return {boolean}
     */
    hasBinding(): boolean
    {
        return this.binding !== undefined && this.binding !== null;
    }
    
    /**
     * Invoke the callback
     *
     * @return {any}
     *
     * @throws {Error}
     */
    public call(): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        const callback: Callback = this.callback;
        
        if (this.hasBinding()) {
            return callback.call(this.binding, ...this.arguments);    
        }
        
        return callback(...this.arguments);
    }
}