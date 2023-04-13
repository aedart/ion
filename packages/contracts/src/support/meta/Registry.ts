import {Key, PropertyKey} from "@aedart/contracts/support";

/**
 * @deprecated TODO: This too needs to be redesigned...
 * 
 * Meta Registry identifier
 * 
 * @type {Symbol}
 */
export const REGISTRY: unique symbol = Symbol('@aedart/support/meta/registry');

/**
 * @deprecated TODO: We need a "private" writer, public reader kind of approach to emulate the "decorator metadata" behaviour (safest)
 * 
 * @see https://github.com/tc39/proposal-decorator-metadata
 * @see https://github.com/tc39/proposal-decorator-metadata/issues/13
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 * 
 * Meta Registry
 */
export default interface Registry
{
    /**
     * Set metadata for given key
     * 
     * @param {object} target
     * @param {Key} key
     * @param {any} data
     * 
     * @returns {this}
     */
    set(
        target: object,
        key: Key,
        data: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): this;

    /**
     * Get metadata that matches given key
     * 
     * @template T
     * @template D
     * 
     * @param {object} target
     * @param {Key} key
     * @param {D} [defaultData=undefined]
     * 
     * @returns {T | D}
     */
    get<T, D = undefined>(target: object, key: Key, defaultData: D): T | D;

    /**
     * Get all metadata about target object
     * 
     * @param {object} target
     * 
     * @returns {Record<PropertyKey, any>} Empty object when no metadata was
     *                                     set for target object.
     */
    all(target: object): Record<
        PropertyKey,
        any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >

    /**
     * Determine if metadata exists that matches given key
     * 
     * @param {object} target
     * @param {Key} key
     * 
     * @returns {boolean}
     */
    has(target: object, key: Key): boolean;

    /**
     * Remove (delete) metadata that matches given key
     * 
     * @param {object} target
     * @param {Key} key
     * 
     * @returns {boolean} True of metadata was removed, false otherwise
     */
    forget(target: object, key: Key): boolean;

    /**
     * Remove all metadata for given target object
     * 
     * @param {object} target
     */
    forgetAll(target: object): void;
}