import type {Key} from "@aedart/contracts/support";
import type { Context, MetaCallback } from "@aedart/contracts/support/meta";
import { set } from "@aedart/support/objects";

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
 * @type {WeakMap<object, Record<string | number | symbol, unknown>>}
 */
const registry: WeakMap<object, Record<string | number | symbol, unknown>> = new WeakMap<object, Record<string | number | symbol, unknown>>();

// TODO: The metadata symbol... we will need this when reading metadata from a target.
// const metadataSymbol = Symbol.for('metadata');

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