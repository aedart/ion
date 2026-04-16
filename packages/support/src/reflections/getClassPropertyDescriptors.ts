import type { ConstructorLike } from "@aedart/contracts";
import { assertHasPrototypeProperty } from "./assertHasPrototypeProperty.js";
import { getAllParentsOfClass } from "./getAllParentsOfClass.js";
import { merge } from "../objects/merge.js";

/**
 * Returns all property descriptors that are defined target's prototype
 *
 * @param {ConstructorLike} target The target class
 * @param {boolean} [recursive=false] If `true`, then target's parent prototypes are traversed.
 *
 * @return {Record<PropertyKey, PropertyDescriptor>}
 *
 * @throws {TypeError}
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
 */
export function getClassPropertyDescriptors(target: ConstructorLike, recursive: boolean = false): Record<PropertyKey, PropertyDescriptor>
{
    assertHasPrototypeProperty(target);

    // Get all prototypes (inheritance chain)
    const prototypes: any[] = recursive
        ? getAllParentsOfClass(target.prototype, true)
        : [target.prototype];

    const output: Record<PropertyKey, PropertyDescriptor> = Object.create(null);
    const protoLen = prototypes.length;

    // Loop through the prototypes (in reverse)
    for (let i = protoLen - 1; i >= 0; i--) {
        const currentProto = prototypes[i];
        const keys = Reflect.ownKeys(currentProto);
        const keysLen = keys.length;

        // Loop through the prototype's keys
        for (let j = 0; j < keysLen; j++) {
            const key = keys[j];
            const descriptor = Reflect.getOwnPropertyDescriptor(currentProto, key);

            if (descriptor === undefined) {
                continue;
            }
            
            // If the key doesn't exist, assign directly to avoid object allocation.
            if (output[key] === undefined) {
                output[key] = descriptor;
                continue;
            }

            // Note: descriptor objects are typically small; merge() is used per constraints.
            output[key] = merge()
                .using({overwriteWithUndefined: false})
                .of(output[key], descriptor);
        }
    }

    return output;
}
