import {Context, MetaTargetContext} from "@aedart/contracts/support/meta";

/**
 * Meta Target Context
 * 
 * @see MetaTargetContext
 */
export default class TargetContext implements MetaTargetContext
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

    /**
     * Create a new Meta Target Context instance
     * 
     * @param {object} owner
     * @param {any} thisArg
     * @param {object} target
     * @param {Context} context
     */
    constructor(
        owner: object,
        thisArg: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        target: object,
        context: Context
    ) {
        this.owner = owner;
        this.thisArg = thisArg;
        this.target = target;
        this.context = context
    }

    /**
     * Returns a new Meta Target Context instance
     * 
     * @param {object} owner
     * @param {any} thisArg
     * @param {object} target
     * @param {Context} context
     * 
     * @return {this|MetaTargetContext}
     * 
     * @static
     */
    public static make(
        owner: object,
        thisArg: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        target: object,
        context: Context
    ): MetaTargetContext
    {
        return new this(owner, thisArg, target, context);
    }
    
    /**
     * Resolves target's owner and returns a new Meta Target Instance
     * 
     * @param {object} target
     * @param {object} thisArg
     * @param {Context} context
     * 
     * @return {this|MetaTargetContext}
     * 
     * @static
     */
    public static resolveOwner(
        target: object,
        thisArg: object,
        context: Context
    ): MetaTargetContext
    {
        // Resolve the target's "owner"
        // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#class_context
        const owner: object = (context.kind === 'class' || context.static)
            ? thisArg
            // When target is not static, then it's obtainable via prototype
            : (Reflect.getPrototypeOf(thisArg) as object).constructor;
        
        return this.make(owner, thisArg, target, context);
    }
}