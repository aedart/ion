import type { Key } from "@aedart/contracts/support";
import type { MetaCallback, MetaEntry, MetaTargetContext } from "@aedart/contracts/support/meta";
import { mergeKeys } from "@aedart/support/misc";

/**
 * Meta Entry
 * 
 * @see MetaEntry
 */
export default class Entry implements MetaEntry
{
    /**
     * Key or path identifier
     *
     * @type {Key}
     */
    key: Key;

    /**
     * Value to store
     *
     * @type {unknown}
     */
    value: unknown;

    /**
     * Create a new Meta Entry instance
     * 
     * @param {Key} key
     * @param {unknown} value
     */
    constructor(key: Key, value: unknown) {
        this.key = key;
        this.value = value;
    }

    /**
     * Create a new Meta Entry instance
     * 
     * @param {Key} key
     * @param {unknown} value
     * 
     * @return {this|MetaEntry}
     * 
     * @static
     */
    public static make(key: Key, value: unknown): MetaEntry
    {
        return new this(key as Key, value);
    }
    
    /**
     * Resolves given key and returns a new Meta Entry instance
     * 
     * @param {MetaTargetContext} targetContext
     * @param {Key | MetaCallback} key
     * @param {any} [value]
     * 
     * @return {this|MetaEntry}
     * 
     * @static
     */
    public static resolve(
        targetContext: MetaTargetContext,
        key: Key | MetaCallback,
        value?: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): MetaEntry
    {
        if (typeof key === 'function') {
            return (key as MetaCallback)(targetContext.target, targetContext.context, targetContext.owner);
        }

        return this.make(key as Key, value);
    }

    /**
     * Resolves given key-value pair and returns a new Meta Entry instance, with prefixed key 
     * 
     * @param {MetaTargetContext} targetContext
     * @param {Key} prefixKey
     * @param {Key|MetaCallback} key
     * @param {unknown} [value]
     * 
     * @return {this|MetaEntry}
     * 
     * @static
     */
    public static resolveWithPrefix(
        targetContext: MetaTargetContext,
        prefixKey: Key,
        key: Key | MetaCallback,
        value?: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): MetaEntry
    {
        const entry = this.resolve(targetContext, key, value);

        entry.key = mergeKeys(prefixKey, entry.key);
        
        return entry;
    }
}