import type { ClassDecoratorResult, ClassMethodDecoratorResult } from "@aedart/contracts";
import type { Key } from "@aedart/contracts/support";
import {
    Context,
    MetaCallback,
    TargetRepository,
    MetaAddress,
    Repository,
    MetaEntry, MetaOwnerReference, type MetaTargetContext
} from "@aedart/contracts/support/meta";
import { FUNCTION_PROTOTYPE } from "@aedart/contracts/support/reflections";
import { METADATA, TARGET_METADATA, Kind } from "@aedart/contracts/support/meta";
import { empty, mergeKeys, toWeakRef } from "@aedart/support/misc";
import { ELEMENT_KIND_IDENTIFIERS, STATIC_IDENTIFIER } from "./helpers";
import { getMetaRepository } from "../getMetaRepository";
import Entry from "../Entry";
import TargetContext from "../TargetContext";
import MetaError from "../exceptions/MetaError";

/**
 * Registry that contains the target object (e.g. a class or a method),
 * along with a "meta address" that points to where the actual metadata
 * is located.
 *
 * @see {MetaAddress}
 * 
 * @type {WeakMap<object, MetaAddress>}
 */
const addressRegistry: WeakMap<object, MetaAddress> = new WeakMap<object, MetaAddress>();

/**
 * Target Meta Repository
 * 
 * @see TargetRepository
 */
export default class TargetMetaRepository implements TargetRepository
{
    /**
     * Returns a new Target Meta Repository
     * 
     * @return {this|TargetRepository}
     */
    public static make(): TargetRepository
    {
        return new this();
    }

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
     * @throws {MetaError}
     */
    public set(
        target: object,
        context: Context,
        key: Key | MetaCallback,
        value?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): ClassDecoratorResult | ClassMethodDecoratorResult
    {
        return this.makeRepository(target)
            .set(
                target,
                context,
                this.makeMetaCallback(key, value)
            );
    }
    
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
    public get<
        T,
        D = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(target: object, key: Key, defaultValue?: D): T | D | undefined
    {
        // Find "target" meta address for given target object
        // or return the default value if none is found.
        const address: MetaAddress | undefined = this.find(target);
        if (address === undefined) {
            return defaultValue;
        }

        // When an address was found, we must ensure that the meta
        // owner class still exists. If not, return default value.
        const owner: object | undefined = address[0]?.deref();
        if (owner === undefined) {
            return defaultValue;
        }

        // Finally, use getMeta to obtain desired key.
        const prefixKey: Key = address[1];

        return this.makeRepository(owner).get<T, D>(
            mergeKeys(prefixKey, key),
            defaultValue
        )
    }

    /**
     * Determine if value exists for key
     *
     * @param {object} target Class or class method target
     * @param {Key} key
     *
     * @return {boolean}
     */
    public has(target: object, key: Key): boolean
    {
        const address: MetaAddress | undefined = this.find(target);
        if (address === undefined) {
            return false;
        }

        const owner: object | undefined = address[0]?.deref();
        if (owner === undefined) {
            return false;
        }
        
        return this.makeRepository(owner).has(
            mergeKeys(address[1], key),
        );
    }

    /**
     * Inherit "target" meta from a base class.
     *
     * **Note**: _Method is intended to be used as a decorator for static class methods,
     * in situations where you overwrite static methods and wish to inherit
     * "target" meta from the parent method._
     *
     * @param {object} target
     * @param {Context} context
     *
     * @return {ClassMethodDecoratorResult}
     *
     * @throws {MetaError}
     */
    inherit(target: object, context: Context): ClassMethodDecoratorResult
    {
        const makePrefixKey = this.makePrefixKey.bind(this);
        const makeRepository = this.makeRepository.bind(this);
        
        return this.set(target, context, (target: object, context: Context, owner: object) => {
            const name = context.name?.toString() || 'unknown';
            
            // Obtain owner's parent or fail if no parent is available.
            if (Reflect.getPrototypeOf(owner) === null) {
                throw new MetaError(`Unable to inherit target meta for ${name}: Owner object does not have a parent class.`, { cause: { target: target, context: context } });
            }

            // Obtain "target" meta from parent, so we can obtain a meta entry and re-set it,
            // which will cause the @targetMeta() and @meta() decorators to do the rest.
            const parent: object = Reflect.getPrototypeOf(owner) as object;
            const prefixKey: Key = makePrefixKey(context);
            const targetMeta: object | undefined = makeRepository(parent)
                .get<object, undefined>(prefixKey);

            // Abort in case that there is nothing to inherit...
            if (empty(targetMeta)) {
                throw new MetaError(`Unable to inherit target meta for ${name}: parent ${context.kind} does not have target meta.`, { cause: { target: target, context: context } });
            }

            // Get the first key-value pair (meta entry), from the "target" metadata
            const key: Key = Reflect.ownKeys(targetMeta as object)[0];
            const value: unknown = (targetMeta as object)[key as keyof typeof targetMeta];

            // Finally, (re)set the meta-entry. This is needed so that we do not add a "null" entry,
            // other kind of useless metadata. All other meta entries are automatically handled by
            // the @meta() decorator.
            return Entry.make(key, value);
        });
    }
    
    /**
     * Find the address where "target" meta is stored for the given target
     *
     * @param {object} target
     *
     * @return {MetaAddress|undefined}
     */
    public find(target: object): MetaAddress | undefined
    {
        // Return target meta address, if available for target...
        let address: MetaAddress | undefined = addressRegistry.get(target);
        if (address !== undefined) {
            return address;
        }

        // When no address is found for the target, and when a class instance is given, the actual
        // target must be changed to the constructor
        if (typeof target == 'object' && Reflect.has(target, 'constructor')) {
            if (addressRegistry.has(target.constructor)) {
                return addressRegistry.get(target.constructor);
            }

            // Otherwise, change the target to the constructor.
            target = target.constructor;
        }

        // When no address is found and the target is a class with metadata,
        // then attempt to find address via its parent.
        let parent:object|null = target;
        while(address === undefined && METADATA in parent) {
            parent = Reflect.getPrototypeOf(parent);
            if (parent === null || parent === FUNCTION_PROTOTYPE) {
                break;
            }

            // Attempt to get meta address from parent.
            address = addressRegistry.get(parent);
        }

        // Recursive version...
        // if (address === undefined && METADATA in target) {
        //     const parent: object | null = Reflect.getPrototypeOf(target);
        //
        //     if (parent !== null && parent !== Reflect.getPrototypeOf(Function)) {
        //         return this.find(parent);
        //     }
        // }

        return address;
    }

    /**
     * Returns a new meta callback for given key-value pair.
     *
     * **Note**: _Callback is responsible for associating key-value pair with class
     * or class method._
     *
     * @param {Key | MetaCallback} key
     * @param {any} [value]
     * 
     * @protected
     */
    protected makeMetaCallback(
        key: Key | MetaCallback,
        value?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): MetaCallback
    {
        const makePrefixKey = this.makePrefixKey.bind(this);
        const makeMetaTargetContext = this.makeMetaTargetContext.bind(this);
        const makeMetaEntry = this.makeMetaEntry.bind(this);
        const makeMetaAddress = this.makeMetaAddress.bind(this);
        const save = this.save.bind(this);
        
        return (target: object, context: Context, owner: object) => {
            // Prevent unsupported kinds from being decorated...
            if (!['class', 'method'].includes(context.kind)) {
                throw new MetaError(`@targetMeta() does not support "${context.kind}" (only "class" and "method" are supported)`, { cause: { target: target, context: context } });
            }

            // Make a "prefix" key, to be used in the final meta entry,
            // and a meta address entry.
            const prefixKey: Key = makePrefixKey(context);
            const address: MetaAddress = makeMetaAddress(owner, prefixKey);

            // Save the address in the registry...
            save(target, address);

            // When a method in a base class is decorated, but the method is overwritten in
            // a subclass, then we must store another address entry, using the owner's
            // method in the registry. This will allow inheriting the meta, but will NOT work
            // on static methods.
            if (context.kind == 'method' && !context.static && Reflect.has(owner, 'prototype')) {
                // @ts-expect-error: TS2339 Owner has a prototype at this point, but Reflect.getPrototypeOf() returns undefined here!
                const proto: object | undefined = (owner).prototype;

                if (proto !== undefined
                    && typeof proto[context.name as keyof typeof proto] == 'function'
                    && proto[context.name as keyof typeof proto] !== target
                ) {
                    save(proto[context.name as keyof typeof proto], address);
                }
            }

            // Finally, return the meta key-value pair that will be stored in the owner's metadata.
            return makeMetaEntry(
                makeMetaTargetContext(owner, null, target, context),
                prefixKey,
                key,
                value
            );
        }
    }
    
    /**
     * Save metadata address in internal registry, for given target
     *
     * @param {object} target The target metadata is to be associated with
     * @param {MetaAddress} address Location where actual metadata is to be found
     * 
     * @return {void}
     * 
     * @protected
     */
    protected save(target: object, address: MetaAddress): void
    {
        addressRegistry.set(target, address);
    }
    
    /**
     * Returns a "prefix" key (path) where "target" metadata must be stored
     *
     * @param {Context} context
     *
     * @return {Key}
     *
     * @throws {MetaError} If {@link Context.kind} is not supported
     * 
     * @protected
     */
    protected makePrefixKey(context: Context): Key
    {
        if (!Reflect.has(Kind, context.kind)) {
            throw new MetaError(`context.kind: "${context.kind}" is unsupported`, { cause: { context: context } });
        }

        const output: PropertyKey[] = [
            TARGET_METADATA,
            ELEMENT_KIND_IDENTIFIERS[Kind[context.kind]]
        ];

        // Ensures that we do not overwrite static / none-static elements with same name!
        if (context.kind !== 'class' && context.static) {
            output.push(STATIC_IDENTIFIER);
        }

        // "anonymous" is for anonymous classes (they do not have a name)
        const name: string | symbol = context.name ?? 'anonymous';
        output.push(name);

        return output as Key;
    }

    /**
     * Returns a new Meta Target Context
     *
     * @param {object} owner
     * @param {any} thisArg
     * @param {object} target
     * @param {Context} context
     * 
     * @return {MetaTargetContext}
     * 
     * @protected
     */
    protected makeMetaTargetContext(
        owner: object,
        thisArg: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        target: object,
        context: Context
    ): MetaTargetContext
    {
        return TargetContext.make(owner, thisArg, target, context);
    }
    
    /*** 
     * Returns a new metadata entry, with prefixed key
     *
     * @param {MetaTargetContext} targetContext
     * @param {Key} prefixKey
     * @param {Key|MetaCallback} key User provided key or callback
     * @param {unknown} [value] Value to store. Ignored if `key` argument is
     *                          a callback.
     *                          
     * @return {MetaEntry}
     * 
     * @protected
     */
    protected makeMetaEntry(
        targetContext: MetaTargetContext,
        prefixKey: Key,
        key: Key | MetaCallback,
        value?: unknown
    ): MetaEntry
    {
        return Entry.resolveWithPrefix(targetContext, prefixKey, key, value);
    }

    /**
     * Returns a new meta address
     * 
     * @param {object|MetaOwnerReference} owner
     * @param {Key} key
     * 
     * @return {MetaAddress}
     * 
     * @protected
     */
    protected makeMetaAddress(owner: object | MetaOwnerReference, key: Key): MetaAddress
    {
        return [
            toWeakRef<typeof owner>(owner) as MetaOwnerReference,
            key
        ]
    }
    
    /**
     * Returns a new Repository instance for given owner
     * 
     * @param {object} owner
     * 
     * @return {Repository}
     * 
     * @protected
     */
    protected makeRepository(owner: object): Repository
    {
        return getMetaRepository(owner);
    }
}