import type {Key} from "@aedart/contracts/support";
import type { Context, MetaCallback, MetadataRecord } from "@aedart/contracts/support/meta";
import { set, get } from "@aedart/support/objects";

/**
 * @typedef {import('@aedart/contracts/support/meta').MetaEntry} MetaEntry
 */

/**
 * Fallback registry of metadata, in case that `context.metadata` is
 * not available.
 * 
 * This registry is NOT intended to be available for writing,
 * outside the scope of the meta decorator.
 * 
 * @type {WeakMap<object, MetadataRecord>}
 */
const registry: WeakMap<object, MetadataRecord> = new WeakMap<object, MetadataRecord>();

/**
 * The well-known symbol for metadata
 * @see https://github.com/tc39/proposal-decorator-metadata
 * 
 * @type {symbol}
 */
const metadataSymbol = Symbol.for('metadata');

/**
 * Store value as metadata, for given key.
 * 
 * @param {Key | MetaCallback} key Key or path identifier. If callback is given,
 *                                 then its resulting {@link MetaEntry}'s `key`
 *                                 and `value` are stored.
 * @param {unknown} [value] Value to store. Ignored if `key` argument is
 *                          a callback.
 * 
 * @returns {(target: object, context: Context) => void} Decorator function
 */
export function meta(
    key: Key | MetaCallback,
    value?: unknown
) {
    return (
        target: object,
        context: Context
    ) => {
        // Resolve the metadata object, either from registry or decorator context.
        let metadata: Record<string | number | symbol, unknown> = registry.get(target) ?? {}; /* eslint-disable-line prefer-const */
        let useFallback: boolean = true;
        const isMetaCallback: boolean = (typeof key === 'function');

        if (Reflect.has(context, 'metadata') && typeof context.metadata === 'object') {
            metadata = context.metadata;
            useFallback = false;
        }
        
        // Unless the key is a callback, then we need to abort if target is undefined, or
        // a class field is attempted decorated. Default behaviour is not able to store
        // metadata for an "undefined" target.
        // @see https://github.com/tc39/proposal-decorators#class-fields
        if (!isMetaCallback && (target === undefined || context.kind === 'field')) {
            throw new TypeError('Unable to store metadata for class field, or undefined target.');
        }

        // In case a callback is given as key, resolve it. The resulting meta entry object's
        // key-value are then used instead.
        if (isMetaCallback) {
            const entry = (key as MetaCallback)(target, context);
            key = entry.key;
            value = entry.value;
        }

        // Set the metadata value.
        set(metadata, (key as Key), value);
        
        // Save metadata object in registry, when fallback approach is used.
        if (useFallback) {
            registry.set(target, metadata);    
        }
    }
}

/**
 * Return metadata that matches key, for given target
 * 
 * @template T
 * @template D=unknown Type of default value
 * 
 * @param {object} target
 * @param {Key} key Key or path identifier
 * @param {D} [defaultValue=undefined] Default value
 * 
 * @returns {T | D | undefined}
 */
export function getMeta<T, D = unknown>(target: object, key: Key, defaultValue?: D): T | D | undefined
{
    const metadata: Readonly<MetadataRecord> | undefined = getAllMeta(target);
    if (metadata === undefined) {
        return defaultValue;
    }
    
    return get(metadata, key, defaultValue);
}

/**
 * Returns all registered metadata for given target, if available
 *
 * @param {object} target
 *
 * @returns {Readonly<MetadataRecord> | undefined}
 */
export function getAllMeta(target: object): Readonly<MetadataRecord> | undefined
{
    // Return all available metadata from target, using the well-known `Symbol.metadata`.
    if (Reflect.has(target, metadataSymbol)) {
        // @ts-expect-error: Target has well-known symbol and should either be an object or undefined.
        return target[metadataSymbol];
    }
    
    // Alternatively, determine if registry has metadata
    if (!registry.has(target)) {
        return undefined;
    }

    // Create a structured clone of the metadata record, so that it
    // can be safely frozen to avoid undesired manipulation outside
    // the scope of the meta decorator.
    return Object.freeze<MetadataRecord | undefined>(
        structuredClone(registry.get(target))
    );
}