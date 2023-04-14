import type {Key} from "@aedart/contracts/support";
import type { Context, MetaCallback, MetaEntry, MetadataRecord } from "@aedart/contracts/support/meta";
import { set, get } from "@aedart/support/objects";

/**
 * Fallback registry of metadata, in case that `context.metadata` is
 * not available.
 *
 * **Warning**: _This registry is **NOT intended** to be available for writing,
 * outside the scope of the meta decorator._
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
 * @see getMeta
 * @see getAllMeta
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
        let useRegistry: boolean = true;
        const isCallback: boolean = (typeof key === 'function');
        
        // Resolve the metadata object, either from registry or decorator context.
        let metadata: MetadataRecord = registry.get(target) ?? {};
        if (Reflect.has(context, 'metadata') && typeof context.metadata === 'object') {
            metadata = context.metadata;
            useRegistry = false;
        }

        // Default behaviour is not able to store meta for class fields, or "undefined"
        // target. However, if a callback is provided, then we proceed. 
        // @see https://github.com/tc39/proposal-decorators#class-fields
        // 
        // NOTE: This will not work, unless the callback also returns a new target that is
        // not "undefined", ... this implementation will not (at least not yet) support such
        // behaviour. Maybe in a future version, if TC39 proposal forms a good solution.
        // @see https://github.com/tc39/proposal-decorator-metadata
        //
        // if ((target === undefined || context.kind === 'field') && !isCallback) {
        //     throw new TypeError('Unable to store metadata for class field, or undefined target.');
        // }

        // Abort when attempting to add meta for a class field or undefined target.
        if (target === undefined || context.kind === 'field') {
            throw new TypeError('Unable to store metadata for class field, or undefined target.');
        }

        // In case a callback is given as key, resolve it. The resulting meta entry
        // object's key-value are then used instead.
        if (isCallback) {
            const entry: MetaEntry = (key as MetaCallback)(target, context);
            // target = entry.newTarget; // This would be needed if registry is used for class field...
            key = entry.key;
            value = entry.value;
        }

        // Set the metadata value and evt. save metadata in registry, if needed.
        set(metadata, (key as Key), value);
        if (useRegistry) {
            registry.set(target, metadata);    
        }
    }
}

/**
 * Return metadata that matches key, for given target
 *
 * @see getAllMeta
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
 * @see getMeta
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

    // Otherwise we must use the registry. However, the metadata must be
    // cloned and frozen to avoid undesired manipulation outside the scope
    // of the meta decorator.
    return Object.freeze<MetadataRecord | undefined>(
        structuredClone(registry.get(target))
    );
}