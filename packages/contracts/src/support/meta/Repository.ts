import { Key } from "@aedart/contracts/support";
import {Context, MetaCallback, MetadataRecord} from "./types";

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
     * Decorator context
     * 
     * @type {Context|undefined}
     */
    readonly context?: Context 
    
    /**
     * Set value for given key
     * 
     * @param {Key | MetaCallback} key
     * @param {any} [value] Value to be stored. Ignored if `key` argument is a callback.
     * 
     * @return {void}
     * 
     * @throws {MetaException}
     */
    set(
        key: Key | MetaCallback,
        value?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): void;

    /**
     * Get value for given key
     * 
     * @template T Return value type
     * @template D=any Type of default value
     * 
     * @param {Key} key
     * @param {D} [defaultValue]
     * 
     * @return {T | D | undefined}
     */
    get<
        T,
        D = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(key: Key, defaultValue?: D): T | D | undefined;

    /**
     * Determine if value exists for key
     * 
     * @param {Key} key
     */
    has(key: Key): boolean;

    /**
     * Get all metadata
     * 
     * @return {MetadataRecord}
     */
    all(): MetadataRecord;
}