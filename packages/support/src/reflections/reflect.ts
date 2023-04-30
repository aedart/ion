import type {Key} from "@aedart/contracts/support";
import type {Context} from "@aedart/contracts/support/meta";
import {META_REFLECTIONS, type Reflection} from "@aedart/contracts/support/reflections";
import {meta, getMeta} from "@aedart/support/meta";
import Encoder, { EncodedReflection } from "./Encoder";

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
        // TODO: Uhm... not sure that we need target and owner as part of the encoded metadata...
        const value:EncodedReflection = Encoder.encodeContext(context, target, owner);
        
        // TODO: Deus Ex... well, not yet sure how this could be utilized...
        switch(context.kind) {
            // TODO: Do we need to store an entire "reflection" object when it's a class, as meta?
                // TODO: ...could perhaps just store it directly in a separate registry?
            
            case 'field':
                // TODO: ...and for fields?
                break;
                
            default:
                context.addInitializer(function() {
                    // const reflectionTarget: any = (context.static)
                    //     ? this[context.name] 
                    //     : owner[context.name];
                    
                    registry.set(target, [ key, new WeakRef(owner) ]);
                });
                break;
        }

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
    // TODO: This could work with inheritance for class elements. BUT, not for the sub-classes themselves!
    
    const entry: [ Key, WeakRef<object> ] | undefined = registry.get(target);
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
    
    return Encoder.decode(encoded);
}

