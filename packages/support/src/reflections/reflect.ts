import type {Key} from "@aedart/contracts/support";
import {type Context, METADATA} from "@aedart/contracts/support/meta";
import {META_REFLECTIONS, type Reflection} from "@aedart/contracts/support/reflections";
import {meta, getMeta} from "@aedart/support/meta";
import Encoder, { EncodedReflection } from "./Encoder";
import {Constructor} from "@aedart/contracts";
import { isset } from "@aedart/support/misc";

/**
 * @deprecated TODO: This component must be redesigned or removed entirely...
 * 
 * Internal registry entry
 *
 * ```
 * 0 = Meta Key,
 * 1 = Weak Reference to owner,
 * ```
 */
type RegistryEntry = [
    Key,
    WeakRef<object>
];

/**
 * @deprecated TODO: This component must be redesigned or removed entirely...
 * 
 * Internal registry of targets and metadata key.
 * 
 * @type {WeakMap<object, RegistryEntry>}
 */
const registry: WeakMap<object, RegistryEntry> = new WeakMap<object, RegistryEntry>();

/**
 * @deprecated TODO: This component must be redesigned or removed entirely...
 * 
 * Store a "reflection" of the target element, as metadata
 * 
 * @returns {(target: object, context: Context) => (void | ((initialValue: unknown) => unknown))}
 */
export function reflect()
{
    return meta((target: object, context: Context, owner: object) => {

        // For now, only classes and methods are supported... A future version could perhaps extend the functionality
        // to offer support for getters, setters, ...etc.
        if (!['class', 'method'].includes(context.kind)) {
            throw new TypeError(`@reflect() does not support "${context.kind}" (only "class" and "method" are supported)`);
        }
        
        // Create a key for given target
        const isStatic: number = (context.kind !== 'class' && context.static)
            ? 1  // static element
            : 0; // non-static element
        
        const key: Key = [
            META_REFLECTIONS,
            Encoder.encodeElementKind(context.kind).toString(),
            isStatic,                               // Ensures that we do not overwrite static / none-static elements with same name!
            context.name ?? 'undefined'             // The "undefined" is for anonymous classes (they do not have a name)
        ];
        
        // Encode parts of the given context...
        const value:EncodedReflection = Encoder.encodeContext(context, owner);

        // Save the key and target owner in an internal registry for target, so it can
        // be looked it up again...
        const registryEntry: RegistryEntry = [ key, new WeakRef(owner) ]; 
        registry.set(target, registryEntry);
        
        // In situations when a base class' method is reflected, but overwritten in a child
        // class, we store another entry with the overwritten method as target in the internal
        // registry. This allows to look up reflection for the overwritten method.
        // NOTE: This will work for non-static methods only...
        if (context.kind === 'method' && Reflect.has(owner, 'prototype')) {
            // @ts-expect-error: TS2339 Owner has a prototype at this point...
            const proto = owner.prototype;

            if (isset(proto, proto[context.name]) && proto[context.name] !== target) {
                registry.set(proto[context.name], registryEntry);
            }
        }

        // Finally, return the key-value pair to be stored as metadata.
        return {
            key,
            value
        };
    });
}

/**
 * @deprecated TODO: This component must be redesigned or removed entirely...
 * 
 * Get a "reflection" of given target, if any was stored as metadata
 * 
 * @param {object} target
 * 
 * @returns {Reflection | undefined}
 */
export function getReflection(target: object): Reflection | undefined
{
    const entry: RegistryEntry | undefined = findEntry(target);
    if (entry === undefined) {
        return undefined;
    }

    const owner: object | undefined = entry[1]?.deref();
    if (owner === undefined) {
        return undefined;
    }

    const encoded: EncodedReflection | undefined | unknown = getMeta<EncodedReflection>(owner, entry[0]);
    if (encoded === undefined) {
        return undefined;
    }
    
    // Whenever the target is a class (that has metadata), we might have obtained reflection
    // metadata via its parent. Therefore, we must ensure that the name is correct.
    const overwrites: { name?: string | symbol | undefined, owner?: object } = Object.create(null);
    if (METADATA in target) {
        overwrites.name = (target as Constructor<unknown>).name;
        overwrites.owner = target;  // If we leave this out, then the top-most parent class (that has reflection)
                                    // is set as the target's owner for a class. Could result in strange usage
                                    // of Reflection object of a class? (...Feels inconsistent).
    }
    
    return Encoder.decode(encoded, target, overwrites);
}

/**
 * @deprecated TODO: This component must be redesigned or removed entirely...
 * 
 * Find entry in registry for given target
 * 
 * @param {object} target
 * 
 * @returns {RegistryEntry | undefined}
 */
function findEntry(target: object): RegistryEntry | undefined
{
    const entry: RegistryEntry | undefined = registry.get(target);

    // In case that target is a class (that has metadata), it could have a parent that
    // has reflection defined. If so, then we attempt to obtain an entry for given
    // parent.
    if (entry === undefined && METADATA in target) {
        const parent = Reflect.getPrototypeOf(target);

        if (parent !== null && parent !== Reflect.getPrototypeOf(Function)) {
            return findEntry(parent);
        }
    }
    
    // Return found entry or undefined...
    return entry;
}

