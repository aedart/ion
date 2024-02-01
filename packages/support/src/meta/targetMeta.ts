import type { Key } from "@aedart/contracts/support";
import type {
    Context,
    MetaCallback,
    MetaEntry,
    MetaAddress,
} from "@aedart/contracts/support/meta";
import { METADATA, TARGET_METADATA, Kind } from "@aedart/contracts/support/meta";
import { mergeKeys, empty } from "@aedart/support/misc";
import { meta, getMeta } from './meta'

/**
 * Registry that contains the target object (e.g. a class or a method),
 * along with a "meta address" to where the actual metadata is located.
 * 
 * @see {MetaAddress}
 */
const addressesRegistry: WeakMap<object, MetaAddress> = new WeakMap<object, MetaAddress>();

/**
 * Map of identifiers to use for meta address, depending on the element kind
 */
const ELEMENT_KIND_IDENTIFIERS = {
    [Kind.class]: Symbol('class'),
    [Kind.method]: Symbol('methods'),
    [Kind.getter]: Symbol('getters'),
    [Kind.setter]: Symbol('setters'),
    [Kind.field]: Symbol('fields'),
    [Kind.accessor]: Symbol('accessors'),
} as const;

/**
 * Static element identifier
 */
const STATIC_IDENTIFIER: unique symbol = Symbol('static'); 

/**
 * Stores value for given key, and associates it directly with the target
 *
 * **Note**: _Method is intended to be used as a decorator!_
 *
 * @example
 * ```ts
 * class A {
 *      @targetMeta('my-key', 'my-value')
 *      foo() {}
 * }
 * 
 * const a: A = new A();
 * getTargetMeta(a.foo, 'my-key'); // 'my-value'
 * ```
 *
 * @see getTargetMeta
 * @see meta
 *
 * @param {Key | MetaCallback} key Key or path identifier. If callback is given,
 *                                 then its resulting {@link MetaEntry}'s `key`
 *                                 and `value` are stored.
 * @param {unknown} [value] Value to store. Ignored if `key` argument is
 *                          a callback.
 * @returns {(target: object, context: Context) => (void | ((initialValue: unknown) => unknown) | undefined)}
 * 
 * @throws {TypeError} When decorated element is not supported
 */
export function targetMeta(
    key: Key | MetaCallback,
    value?: unknown
) {
    return meta((target: object, context: Context, owner: object) => {

        // Prevent unsupported kinds from being decorated...
        if (!['class', 'method'].includes(context.kind)) {
            throw new TypeError(`@targetMeta() does not support "${context.kind}" (only "class" and "method" are supported)`);
        }
        
        // Make a "prefix" key, to be used in the final meta entry,
        // and a meta address entry.
        const prefixKey: Key = makePrefixKey(context);
        const address: MetaAddress = [
            new WeakRef(owner),
            prefixKey
        ];
        
        // Save the address in the registry...
        saveAddress(target, address);

        // When a method in a base class is decorated, but the method is overwritten in
        // a subclass, then we must store another address entry, using the owner's
        // method in the registry. This will allow inheriting the meta, but will NOT work
        // on static methods.
        if (context.kind == 'method' && !context.static && Reflect.has(owner, 'prototype')) {
            // @ts-expect-error: TS2339 Owner has a prototype at this point, but Reflect.getPrototypeOf() returns undefined here!
            const proto: object | undefined = owner.prototype;

            if (proto !== undefined && typeof proto[context.name] == 'function' && proto[context.name] !== target) {
                saveAddress(proto[context.name], address);
            }
        }
        
        // Finally, return the meta key-value pair that will be stored in the owner's metadata.
        return makeMetaEntry(
            target,
            context,
            owner,
            prefixKey,
            key,
            value
        );
    });
}

/**
 * Inherit "target" meta from a base class.
 * 
 * **Note**: _Method is intended to be used as a decorator!_
 *
 * **Note**: _Can be used to inherit "target" meta for static methods, when they are overwritten._
 * 
 * @see targetMeta
 * 
 * @example
 * ```ts
 * class A {
 *      @targetMeta('bar', 'zaz')
 *      static foo() {}
 * }
 *
 * class B extends A {
 * 
 *     @inheritTargetMeta()
 *     static foo() {
 *          // ...overwritten static method...//
 *     }
 * }
 *
 * getTargetMeta(B.foo, 'bar'); // 'zaz'
 * ```
 *
 * @returns {(target: object, context: Context) => (void | ((initialValue: unknown) => unknown) | undefined)}
 *
 * @throws {TypeError} When decorated element's owner class has no parent, or when no "target" metadata available
 *                     on parent element.
 */
export function inheritTargetMeta()
{
    return targetMeta((target: object, context: Context, owner: object) => {
        // Obtain owner's parent or fail if no parent is available.
        if (Reflect.getPrototypeOf(owner) === null) {
            throw new TypeError(`Unable to inherit target meta for ${context.name}: Owner object does not have a parent class.`);
        }

        // Obtain "target" meta from parent, so we can obtain a meta entry and re-set it,
        // which will cause the @targetMeta() and @meta() decorators to do the rest.
        const prefixKey: Key = makePrefixKey(context);
        const targetMeta: object | undefined = getMeta<object>(Reflect.getPrototypeOf(owner), prefixKey);
        
        // Abort in case that there is nothing to inherit...
        if (empty(targetMeta)) {
            throw new TypeError(`Unable to inherit target meta for ${context.name}: parent ${context.kind} does not have target meta.`);
        }
        
        // Get the first key-value pair (meta entry), from the "target" metadata
        const key: Key = Reflect.ownKeys(targetMeta)[0];
        const value: unknown = targetMeta[key];

        // Finally, (re)set the meta-entry. This is needed so that we do not add a "null" entry,
        // other kind of useless metadata. All other meta entries are automatically handled by
        // the @meta() decorator.
        return {
            key,
            value
        } as MetaEntry;
    });
}

/**
 * Return metadata that matches key, that belongs to the given target
 *
 * **Note**: _Unlike the {@link getMeta} method, this method does not require you
 * to know the owner object (e.g. the class) that holds metadata, provided
 * that metadata has been associated with given target, via {@link targetMeta}._
 * 
 * @see targetMeta
 * @see getMeta
 *
 * @template T
 * @template D=unknown Type of default value
 *
 * @param {object} target Class or method that owns metadata
 * @param {Key} key Key or path identifier
 * @param {D} [defaultValue=undefined] Default value to return, in case key does not exist
 *
 * @returns {T | D | undefined}
 */
export function getTargetMeta<T, D = unknown>(target: object, key: Key, defaultValue?: D): T | D | undefined
{
    // Find "target" meta address for given target object
    // or return the default value if none is found.
    const address: MetaAddress = findAddress(target);
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
    return getMeta<T, D>(
        owner,
        mergeKeys(prefixKey, key),
        defaultValue
    );
}

/**
 * Find the address where "target" meta is stored for the given target
 * 
 * @param {object} target
 * 
 * @return {MetaAddress|undefined}
 */
function findAddress(target: object): MetaAddress | undefined
{
    let address: MetaAddress | undefined = addressesRegistry.get(target);
    if (address !== undefined) {
        return address;
    }

    // Obtain the prototype of Function...
    const functionProto: object|null = Reflect.getPrototypeOf(Function);

    // When no address is found and the target is a class with metadata,
    // then attempt to find address via its parent.
    let parent:object|null = target;
    while(address === undefined && METADATA in parent) {
        parent = Reflect.getPrototypeOf(parent);
        if (parent === null || parent === functionProto) {
            break;
        }

        // Attempt to get meta address from parent.
        address = addressesRegistry.get(parent);
    }

    // Recursive version...
    // if (address === undefined && METADATA in target) {
    //     const parent: object | null = Reflect.getPrototypeOf(target);
    //
    //     if (parent !== null && parent !== Reflect.getPrototypeOf(Function)) {
    //         return findAddress(parent);
    //     }
    // }
    
    return address;
}

/**
 * Save metadata address in internal registry, for given target
 * 
 * @param {object} target The target metadata is to be associated with
 * @param {MetaAddress} address Location where actual metadata is to be found
 */
function saveAddress(target: object, address: MetaAddress): void
{
    addressesRegistry.set(target, address);
}

/**
 * Returns a "prefix" key (path) where "target" metadata must be stored
 * 
 * @param {Context} context
 * 
 * @return {Key}
 * 
 * @throws {TypeError} If {@link Context.kind} is not supported
 */
function makePrefixKey(context: Context): Key
{
    if (!Reflect.has(Kind, context.kind)) {
        throw new TypeError(`context.kind: "${context.kind}" is unsupported`);
    }
    
    // Debug
    // console.log('@kind', ELEMENT_KIND_MAP[Kind[context.kind]]);
    
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
 * Returns a new metadata entry
 * 
 * @param {object} target
 * @param {Context} context
 * @param {object} owner
 * @param {Key} prefixKey
 * @param {Key|MetaCallback} key User provided key or callback
 * @param {unknown} [value] Value to store. Ignored if `key` argument is
 *                          a callback.
 * 
 * @return {MetaEntry}
 */
function makeMetaEntry(
    target: object,
    context: Context,
    owner: object,
    prefixKey: Key,
    key: Key | MetaCallback,
    value?: unknown
): MetaEntry
{
    let resolvedKey: Key | MetaCallback = key;
    let resolvedValue: unknown = value;
    
    // When key is a callback, invoke it and use its resulting key-value pair.
    if (typeof key == 'function') {
        const entry: MetaEntry = (key as MetaCallback)(target, context, owner);

        resolvedKey = entry.key;
        resolvedValue = entry.value;
    }
    
    return {
        key: mergeKeys(prefixKey, resolvedKey as Key),
        value: resolvedValue
    } as MetaEntry;
}