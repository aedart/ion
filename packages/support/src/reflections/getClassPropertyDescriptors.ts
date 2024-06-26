import type { ConstructorLike } from "@aedart/contracts";
import { getClassPropertyDescriptor } from "./getClassPropertyDescriptor";
import { assertHasPrototypeProperty } from "./assertHasPrototypeProperty";
import { getAllParentsOfClass } from "./getAllParentsOfClass";
import { merge } from "@aedart/support/objects";

/**
 * Returns all property descriptors that are defined target's prototype
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
 * 
 * @param {ConstructorLike} target The target class
 * @param {boolean} [recursive=false] If `true`, then target's parent prototypes are traversed.
 *                                    Descriptors are merged, such that the top-most class' descriptors
 *                                    are returned.
 * 
 * @return {Record<PropertyKey, PropertyDescriptor>} Object with the property descriptors, or empty object of target has
 *                                                   properties defined.
 * 
 * @throws {TypeError} If target is not an object or has no prototype property
 */
export function getClassPropertyDescriptors(target: ConstructorLike, recursive: boolean = false): Record<PropertyKey, PropertyDescriptor>
{
    assertHasPrototypeProperty(target);

    // Define list of targets...
    let targets = [target.prototype];

    // Obtain target's parent classes, such that top-most descriptors can be returned, if needed.
    if (recursive) {
        targets = getAllParentsOfClass(target.prototype, true).reverse();
    }
    
    const output: Record<PropertyKey, PropertyDescriptor> = Object.create(null);
    
    // Obtain property descriptors for all targets
    for (const t of targets) {
        const keys: PropertyKey[] = Reflect.ownKeys(t);
        for (const key of keys) {
            const descriptor: PropertyDescriptor | undefined = getClassPropertyDescriptor(t.constructor, key);
            
            // If for some reason we are unable to obtain a descriptor, then skip it.
            if (descriptor === undefined) {
                continue;
            }

            // Merge evt. existing descriptor object with the one obtained from target.
            if (Reflect.has(output, key)) {
                output[key] = merge()
                    .using({ overwriteWithUndefined: false })
                    .of(output[key], descriptor);
                continue;
            }

            output[key] = descriptor;
        }
    }
    
    return output;
}