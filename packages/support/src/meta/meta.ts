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
    return (target: object, context: Context) => {
        // The "kind" of target that is being decorated
        const kind = context.kind;

        // For a class target, the meta can be added directly.
        if (kind === 'class') {
            const targetClass: object = target;
            
            return save(
                resolve(key, value, target, context, targetClass),
                targetClass,
                context
            );
        }

        // When a field is decorated, we need to rely on the value initialisation to
        // obtain correct target class...
        if (kind === 'field') {
            return function(initialValue: unknown) {
                // @ts-expect-error: TS has issues with "this" being set here, claiming that it corresponds to "any"
                const targetClass: object = getTargetClass(this, context);

                save(
                    resolve(key, value, target, context, targetClass),
                    targetClass,
                    context
                );

                return initialValue;
            }
        }
        
        // For all other kinds of targets, we need to use the initialisation logic
        // to obtain the correct target class. This is needed for current implementation
        // and until the TC39 proposal is approved and implemented.
        // @see https://github.com/tc39/proposal-decorator-metadata
        context.addInitializer(function() {
            // @ts-expect-error: TS has issues with "this" being set here, claiming that it corresponds to "any"
            const targetClass: object = getTargetClass(this, context);

            save(
                resolve(key, value, target, context, targetClass),
                targetClass,
                context
            );
        });
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
 * @param {object} target Target Class
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
 * @param {object} target Target Class
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

/**
 * Set "meta" entry for given target class
 *
 * @param {MetaEntry} entry
 * @param {object} targetClass
 * @param {Context} context
 */
function save(
    entry: MetaEntry,
    targetClass: object,
    context: Context
) {
    // State whether to use registry or context.metadata
    const useRegistry: boolean = !(Reflect.has(context, 'metadata') && typeof context.metadata === 'object');

    // Obtain the metadata record for the target
    let metadata: MetadataRecord = (useRegistry) /* eslint-disable-line prefer-const */
        ? registry.get(targetClass) ?? {}
        : (context.metadata as MetadataRecord);

    // Set key-value in record...
    set(metadata, entry.key, entry.value);

    // Persist metadata in registry, if needed.
    if (useRegistry) {
        registry.set(targetClass, metadata);
    }
}

/**
 * Resolve the "meta" entry's key and value.
 *
 * If key is a callback, then it will be invoked. Otherwise,
 * a new meta entry object is returned with given key-value.
 *
 * @param {Key | MetaCallback} key
 * @param {unknown} value Ignored if key is a callback
 * @param {object} target Target that is being decorated
 * @param {Context} context Decorator context
 * @param {object} targetClass Target class
 *
 * @returns {MetaEntry}
 */
function resolve(
    key: Key | MetaCallback,
    value: unknown,
    target: object,
    context: Context,
    targetClass: object
): MetaEntry
{
    if (typeof key === 'function') {
        (key as MetaCallback)(target, context, targetClass);
    }

    return {
        key: (key as Key),
        value: value
    }
}

/**
 * Returns the target class
 *
 * **Caution**: _`thisArg` should only be set from an "addInitializer" callback
 * function._ 
 *
 * @param {object} thisArg
 * @param {Context} context
 *
 * @returns {object}
 */
function getTargetClass(thisArg: object, context: Context): object
{
    if (context.kind === 'class') {
        return thisArg;
    }

    return (context.static)
        ? thisArg
        // @ts-expect-error: When target is not static, then it's obtainable via prototype
        : Reflect.getPrototypeOf(thisArg).constructor;
}