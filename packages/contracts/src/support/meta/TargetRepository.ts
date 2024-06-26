import { Key } from "@aedart/contracts/support";
import { Context, MetaCallback } from "./types";
import { ClassDecoratorResult, ClassMethodDecoratorResult } from "@aedart/contracts";

/**
 * Meta Target Repository
 * 
 * Responsible for associating metadata directory with a target class or class method.
 */
export default interface TargetRepository
{
    /**
     * Set value for given key, and associates it directly with the target
     *
     * **Caution**: _Method is intended to be invoked inside a decorator!_
     *
     * @param {object} target Class or class method target
     * @param {Context} context
     * @param {Key | MetaCallback} key
     * @param {any} [value] Value to be stored. Ignored if `key` argument is a callback.
     *
     * @return {ClassDecoratorResult | ClassMethodDecoratorResult}
     * 
     * @throws {MetaException}
     */
    set(
        target: object,
        context: Context,
        key: Key | MetaCallback,
        value?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): ClassDecoratorResult | ClassMethodDecoratorResult;
    
    /**
     * Get value for given key
     *
     * @template T Return value type
     * @template D=undefined Type of default value
     *
     * @param {object} target Class or class method target
     * @param {Key} key
     * @param {D} [defaultValue]
     *
     * @return {T | D}
     */
    get<T, D = undefined>(target: object, key: Key, defaultValue?: D): T | D;

    /**
     * Determine if value exists for key
     *
     * @param {object} target Class or class method target
     * @param {Key} key
     * 
     * @return {boolean}
     */
    has(target: object, key: Key): boolean;

    /**
     * Determine there is any metadata associated with target
     * 
     * @param {object} target
     * 
     * @return {boolean}
     */
    hasAny(target: object): boolean;
    
    /**
     * Inherit "target" meta from a base class.
     *
     * **Note**: _Method is intended to be used as a decorator for static class methods,
     * in situations where you overwrite static methods and wish to inherit
     * "target" meta from the parent method._
     * 
     * @param {object} target
     * @param {Context} context
     *
     * @return {ClassMethodDecoratorResult}
     * 
     * @throws {MetaException}
     */
    inherit(target: object, context: Context): ClassMethodDecoratorResult;
}