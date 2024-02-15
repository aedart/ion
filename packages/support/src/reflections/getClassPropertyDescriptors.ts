import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { FUNCTION_PROTOTYPE } from "@aedart/contracts/support/reflections";
import { getClassPropertyDescriptor } from "./getClassPropertyDescriptor";

/**
 * Returns all property descriptors that are defined target's prototype
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
 * 
 * @param {ConstructorOrAbstractConstructor} target The target class
 * @param {boolean} [recursive=false] If `true`, then target's parent prototypes are traversed.
 *                                    Descriptors are merged, such that the top-most class' descriptors
 *                                    are returned.
 * 
 * @return {Record<object, PropertyDescriptor>} Object with the property descriptors, or empty object of target has
 *                                              properties defined.
 * 
 * @throws {TypeError} If target is not an object or has no prototype
 */
export function getClassPropertyDescriptors(target: ConstructorOrAbstractConstructor, recursive: boolean = false): Record<object, PropertyDescriptor>
{
    if (typeof target['prototype'] === 'undefined') {
        throw new TypeError('Target has not "prototype"');
    }

    // Define list of targets...
    const targets = [target.prototype];
    
    // If recursive flag is set, then all of target's parent classes must be obtained.
    if (recursive) {
        let parent = Reflect.getPrototypeOf(target.prototype);

        while(parent !== null && parent !== FUNCTION_PROTOTYPE) {
            targets.push(parent);

            parent = Reflect.getPrototypeOf(parent);
        }

        // Reverse the targets, such that the top-most property descriptors are returned.
        targets.reverse();
    }
    
    const output: Record<object, PropertyDescriptor> = Object.create(null);
    
    // Obtain property descriptors for all targets
    for (const t of targets) {
        const keys: PropertyKey[] = Reflect.ownKeys(t);
        for (const key: PropertyKey of keys) {
            const descriptor: PropertyDescriptor | undefined = getClassPropertyDescriptor(t.constructor, key);
            if (descriptor === undefined) {
                output[key] = undefined;
                continue;
            }

            // Merge evt. existing descriptor object with the one obtained from target.
            if (Reflect.has(output, key)) {
                output[key] = Object.assign(output[key], descriptor);
                continue;
            }

            output[key] = descriptor;
        }
    }
    
    return output;
}