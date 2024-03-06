import { Key } from "@aedart/contracts/support";
import { Context, MetaCallback } from "@aedart/contracts/support/meta/types";
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
     * @template D=any Type of default value
     *
     * @param {object} target Class or class method target
     * @param {Key} key
     * @param {D} [defaultValue]
     *
     * @return {T | D | undefined}
     */
    get<
        T,
        D = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(target: object, key: Key, defaultValue?: D): T | D | undefined;

    /**
     * Determine if value exists for key
     *
     * @param {object} target Class or class method target
     * @param {Key} key
     * 
     * @return {boolean}
     */
    has(target: object, key: Key): boolean;
}