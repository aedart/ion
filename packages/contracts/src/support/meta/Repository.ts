import { DecoratorResult } from "@aedart/contracts";
import { Key } from "@aedart/contracts/support";
import { Context, MetaCallback, MetadataRecord } from "./types";

/**
 * Meta Repository
 */
export default interface Repository
{
    /**
     * The owner class
     * 
     * @type {object}
     */
    readonly owner: object;

    /**
     * Set value for given key
     * 
     * **Caution**: _Method is intended to be invoked inside a decorator!_
     * 
     * @param {object} target Decorator target, e.g. class, field, method...etc
     * @param {Context} context
     * @param {Key | MetaCallback} key
     * @param {any} [value] Value to be stored. Ignored if `key` argument is a callback.
     * 
     * @return {DecoratorResult}
     */
    set(
        target: object,
        context: Context,
        key: Key | MetaCallback,
        value?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): DecoratorResult;

    /**
     * Get value for given key
     * 
     * @template T Return value type
     * @template D=undefined Type of default value
     * 
     * @param {Key} key
     * @param {D} [defaultValue]
     * 
     * @return {T | D}
     */
    get<T, D = undefined>(key: Key, defaultValue?: D): T | D;

    /**
     * Determine if value exists for key
     * 
     * @param {Key} key
     * 
     * @return {boolean}
     */
    has(key: Key): boolean;

    /**
     * Get all metadata
     * 
     * @return {MetadataRecord}
     */
    all(): MetadataRecord;
}