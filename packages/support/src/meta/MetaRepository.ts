import type { DecoratorResult } from "@aedart/contracts";
import type {
    Context,
    MetaCallback,
    MetadataRecord,
    MetaEntry,
    MetaTargetContext,
    Repository,
    InitializerCallback
} from "@aedart/contracts/support/meta";
import { METADATA } from "@aedart/contracts/support/meta";
import type { Key } from "@aedart/contracts/support";
import { set, get, has, merge } from "@aedart/support/objects";
import Entry from "./Entry";
import TargetContext from "./TargetContext";

/**
 * Fallback registry that contains writable metadata (`context.metadata`).
 * 
 * This registry is only to be used when the system / browser does not support
 * `context.metadata`.
 *
 * **Warning**: _This registry is **NOT intended** to be available for writing,
 * outside the scope of a "meta" decorator._
 *
 * @type {WeakMap<object, MetadataRecord>}
 */
const registry: WeakMap<object, MetadataRecord> = new WeakMap<object, MetadataRecord>();

/**
 * Meta Repository
 * 
 * @see Repository
 */
export default class MetaRepository implements Repository
{
    /**
     * The owner class
     *
     * @type {object}
     * 
     * @private
     */
    readonly #owner: object;

    /**
     * Create a new Meta Repository instance
     * 
     * @param {object} owner
     */
    constructor(owner: object) {
        this.#owner = owner;
    }

    /**
     * Create a new Meta Repository instance
     * 
     * @param {object} owner
     * 
     * @return {this|Repository}
     */
    public static make(owner: object): Repository
    {
        return new this(owner);
    }
    
    /**
     * The owner class
     *
     * @type {object}
     */
    public get owner(): object
    {
        return this.#owner;
    }

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
    public set(
        target: object,
        context: Context,
        key: Key | MetaCallback,
        value?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): DecoratorResult
    {
        const save = this.save.bind(this);
        const resolveTargetContext = this.resolveMetaTargetContext.bind(this);
        
        switch(context.kind) {
            // For a class target, the meta can be added directly.
            case 'class':
                return save(
                    resolveTargetContext(target, target, context),
                    key,
                    value
                );

            // When a field is decorated, we need to rely on the value initialisation to
            // obtain correct owner...
            case 'field':
                return function(initialValue: unknown) {
                    save(
                        // @ts-expect-error: "this" corresponds to class instance.
                        resolveTargetContext(target, this, context),
                        key,
                        value
                    );

                    return initialValue;
                }

            // For all other kinds of targets, we need to use the initialisation logic
            // to obtain the correct owner. This is needed for current implementation
            // and until the TC39 proposal is approved and implemented.
            // @see https://github.com/tc39/proposal-decorator-metadata
            default:
                context.addInitializer(function() {
                    save(
                        // @ts-expect-error: "this" corresponds to class instance.
                        resolveTargetContext(target, this, context),
                        key,
                        value
                    );
                });
                return;
        }
    }

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
    public get<T, D = undefined>(key: Key, defaultValue?: D): T | D
    {
        return get(this.all(), key, defaultValue);
    }

    /**
     * Determine if value exists for key
     *
     * @param {Key} key
     */
    public has(key: Key): boolean
    {
        return has(this.all(), key);
    }

    /**
     * Get all metadata
     *
     * @return {MetadataRecord}
     */
    public all(): MetadataRecord
    {
        return this.owner[METADATA as keyof typeof this.owner] as MetadataRecord || {} as MetadataRecord
    }

    /**
     * Save metadata
     *
     * @param {MetaTargetContext} targetContext
     * @param {Key | MetaCallback} key
     * @param {any} [value]
     * 
     * @return {void}
     * 
     * @protected
     */
    protected save(
        targetContext: MetaTargetContext,
        key: Key | MetaCallback,
        value?: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): void
    {
        const context: Context = targetContext.context;
        const metadata: MetadataRecord = this.resolveMetadataRecord(targetContext.owner, context);

        // Whenever the key is a "meta" callback, for any other kind than a class or a field,
        // we overwrite the "context.addInitializer" method, so init callbacks can be invoked
        // manually after meta has been defined.
        const callbacks: InitializerCallback[] = [];
        if (typeof key === 'function' && (context.kind !== 'class' && context.kind !== 'field')) {
            context.addInitializer = (callback: InitializerCallback) => {
                callbacks.push(callback);
            }
        }

        // Resolve meta entry (key and value). When a "meta callback" is given, it is invoked
        // here. Afterward, set the resolved key-value. 
        const entry: MetaEntry = this.resolveEntry(
            targetContext,
            key,
            value,
        );

        set(metadata, entry.key, entry.value);

        // When the metadata originates from the decorator context, we can stop here.
        // Otherwise, we need to save it in the internal registry...
        if (this.useMetadataFromContext(context)) {
            this.runInitCallbacks(targetContext, callbacks);
            return;
        }

        registry.set(targetContext.owner, metadata);

        // Lastly, define the owner[Symbol.metadata] property (only done once for the owner).
        // In case that owner is a subclass, then this ensures that it "overwrites" the parent's
        // [Symbol.metadata] property and offers its own version thereof.
        this.defineMetadataProperty(targetContext.owner);

        // Invoke evt. init callbacks...
        this.runInitCallbacks(targetContext, callbacks);
    }

    /**
     * Defines the {@link METADATA} property in given owner
     * 
     * @param {object} owner
     * 
     * @return {void}
     * 
     * @protected
     */
    protected defineMetadataProperty(owner: object): void
    {
        Reflect.defineProperty(owner, METADATA, {
            get: () => {
                // To ensure that metadata cannot be changed outside the scope and context of a
                // meta decorator, a deep clone of the record is returned here.
                return merge()
                    .using({
                        arrayMergeOptions: {
                            transferFunctions: true
                        }
                    })
                    .of(Object.create(null), registry.get(owner) || Object.create(null))
            },

            // Ensure that the property cannot be deleted
            configurable: false
        });
    }
    
    /**
     * Invokes the given initialisation callbacks
     *
     * @param {MetaTargetContext} targetContext
     * @param {InitializerCallback[]} callbacks
     * 
     * @return {void}
     * 
     * @protected
     */
    protected runInitCallbacks(targetContext: MetaTargetContext, callbacks: InitializerCallback[]): void
    {
        callbacks.forEach((callback) => {
            callback.call(targetContext.thisArg);
        });
    }

    /**
     * Determine if metadata record can be used from decorator context
     * 
     * @param {Context} context
     * 
     * @return {boolean}
     * 
     * @protected
     */
    protected useMetadataFromContext(context: Context): boolean
    {
        return Reflect.has(context, 'metadata') && typeof context.metadata == 'object';
    }

    /**
     * Resolve the metadata record that must be used when writing new metadata
     *
     * @param {object} owner
     * @param {Context} context
     * 
     * @protected
     */
    protected resolveMetadataRecord(owner: object, context: Context): MetadataRecord
    {
        if (this.useMetadataFromContext(context)) {
            return context.metadata as MetadataRecord;
        }

        // Obtain record from registry, or create new empty object.
        let metadata: MetadataRecord = registry.get(owner) ?? Object.create(null);

        // In case that the owner has Symbol.metadata defined (e.g. from base class),
        // then merge it current metadata. This ensures that inheritance works as
        // intended, whilst a base class still keeping its original metadata.
        if (Reflect.has(owner, METADATA)) {
            metadata = Object.assign(metadata, owner[METADATA as keyof typeof owner]);
        }

        return metadata;
    }
    
    /**
     * Resolve the "meta" entry's key and value
     *
     * @param {MetaTargetContext} targetContext
     * @param {Key | MetaCallback} key
     * @param {any} [value]
     * 
     * @return {MetaEntry}
     * 
     * @protected
     */
    protected resolveEntry(
        targetContext: MetaTargetContext,
        key: Key | MetaCallback,
        value?: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): MetaEntry
    {
        return Entry.resolve(targetContext, key, value);
    }
    
    /**
     * Resolve the meta target context
     *
     * **Caution**: _`thisArg` should only be set from an "addInitializer" callback
     * function, via decorator context._
     *
     * @param {object} target Target the is being decorated
     * @param {object} thisArg The bound "this" value, from "addInitializer" callback function.
     * @param {Context} context
     * 
     * @return {MetaTargetContext}
     * 
     * @protected
     */
    protected resolveMetaTargetContext(
        target: object,
        thisArg: object,
        context: Context
    ): MetaTargetContext
    {
        return TargetContext.resolveOwner(target, thisArg, context);
    }
}