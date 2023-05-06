import type {Key} from "@aedart/contracts/support";
import {type Context, METADATA} from "@aedart/contracts/support/meta";
import {META_REFLECTIONS, type Reflection} from "@aedart/contracts/support/reflections";
import {meta, getMeta} from "@aedart/support/meta";
import Encoder, { EncodedReflection } from "./Encoder";
import {Constructor} from "@aedart/contracts";

/**
 * Internal registry of targets and metadata key.
 * 
 * @type {WeakMap<object, [ Key, WeakRef<object> ]>}
 */
const registry: WeakMap<object, [ Key, WeakRef<object> ]> = new WeakMap<object, [Key, WeakRef<object>]>();

/**
 * Store a "reflection" of the target element, as metadata
 * 
 * @returns {(target: object, context: Context) => (void | ((initialValue: unknown) => unknown))}
 */
export function reflect()
{
    return meta((target: object, context: Context, owner: object) => {
        
        // Create a key for given target
        const key: Key = [ META_REFLECTIONS, context.kind, context.name ?? 'undefined'];
        
        // Encode parts of the given context...
        const value:EncodedReflection = Encoder.encodeContext(context, owner);

        // Save the key and target owner in an internal registry for target, so it can
        // be looked it up again...
        const registryEntry: [Key, WeakRef<object>] = [ key, new WeakRef(owner) ]; 
        registry.set(target, registryEntry);

        // Finally, return the key-value pair to be stored as metadata.
        return {
            key,
            value
        };
    });
}

/**
 * Get a "reflection" of given target, if any was stored as metadata
 * 
 * @param {object} target
 * 
 * @returns {Reflection | undefined}
 */
export function getReflection(target: object): Reflection | undefined
{
    const entry: [ Key, WeakRef<object> ] | undefined = findEntry(target);
    if (entry === undefined) {
        return undefined;
    }

    const owner: object | undefined = entry[1]?.deref();
    if (owner === undefined) {
        return undefined;
    }

    const encoded: EncodedReflection | undefined = getMeta<EncodedReflection, undefined>(owner, entry[0]);
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
 * Find entry in registry for given target
 * 
 * @param {object} target
 * 
 * @returns {[Key, WeakRef<object>] | undefined}
 */
function findEntry(target: object): [ Key, WeakRef<object> ] | undefined
{
    const entry: [ Key, WeakRef<object> ] | undefined = registry.get(target);

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

