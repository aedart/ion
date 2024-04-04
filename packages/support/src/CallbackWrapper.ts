import type { Callback } from "@aedart/contracts";
import type { CallbackWrapper as CallbackWrapperInterface } from "@aedart/contracts/support";
import { use } from "@aedart/support/concerns";
import ArbitraryData from "./ArbitraryData";

/**
 * Callback Wrapper
 * 
 * @see [CallbackWrapper]{@link import('@aedart/contracts/support').CallbackWrapper}
 * 
 * @mixes ArbitraryData
 */
@use(ArbitraryData)
export default class CallbackWrapper implements CallbackWrapperInterface
{
    /**
     * Alias for {@link ArbitraryData#set}
     *
     * @function set
     * @param {Key} key
     * @param {any} value
     * @return {this}
     *
     * @instance
     * @memberof CallbackWrapper
     */

    /**
     * Alias for {@link ArbitraryData#get}
     *
     * @function get
     *
     * @template T
     * @template D=undefined
     *
     * @param {Key} key
     * @param {D} [defaultValue]
     * @return {this}
     *
     * @instance
     * @memberof CallbackWrapper
     */

    /**
     * Alias for {@link ArbitraryData#has}
     *
     * @function has
     * @param {Key} key
     * @return {boolean}
     *
     * @instance
     * @memberof CallbackWrapper
     */

    /**
     * Alias for {@link ArbitraryData#forget}
     *
     * @function forget
     * @param {Key} key
     * @return {boolean}
     *
     * @instance
     * @memberof CallbackWrapper
     */

    /**
     * Alias for {@link ArbitraryData#all}
     *
     * @function all
     * @return {Record<PropertyKey, any>}
     *
     * @instance
     * @memberof CallbackWrapper
     */

    /**
     * Alias for {@link ArbitraryData#flush}
     *
     * @function flush
     * @return {void}
     *
     * @instance
     * @memberof CallbackWrapper
     */
    
    /**
     * The callback
     *
     * @type {Callback}
     *
     * @protected
     * @readonly
     */
    protected readonly _callback: Callback;

    /**
     * "This" value that callback is bound to
     *
     * @type {object | undefined}
     *
     * @readonly
     * @protected
     */
    protected _binding: object | undefined = undefined;

    /**
     * Arguments to be passed on to the callback
     * when invoked.
     *
     * @type {any[]}
     * 
     * @protected
     */
    protected _arguments: any[] = []; /* eslint-disable-line @typescript-eslint/no-explicit-any */

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
        
        this._callback = callback;
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
        return this._callback;
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
        return this._binding;
    }

    /**
     * Arguments to be passed on to the callback
     * when invoked.
     *
     * @param {any[]} args
     */
    public set arguments(args: any[]) /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this._arguments = args;
    }

    /**
     * Arguments to be passed on to the callback
     * when invoked.
     *
     * @return {any[]}
     */
    public get arguments(): any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        return this._arguments;
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
        this._binding = thisArg;

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