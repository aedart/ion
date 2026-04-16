import type { ConstructorLike } from "@aedart/contracts";
import { getClassPropertyDescriptor } from "./getClassPropertyDescriptor.js";
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

    // 1. Identify inheritance chain. 
    // We use a flat array to avoid iterator overhead in the hot path.
    const prototypes: any[] = recursive
        ? getAllParentsOfClass(target.prototype, true).reverse()
        : [target.prototype];

    const output: Record<PropertyKey, PropertyDescriptor> = Object.create(null);
    const protoLen = prototypes.length;

    // 2. Optimized nested loop (Index-based)
    for (let i = 0; i < protoLen; i++) {
        const currentProto = prototypes[i];
        const keys = Reflect.ownKeys(currentProto);
        const keysLen = keys.length;

        for (let j = 0; j < keysLen; j++) {
            const key = keys[j];
            const descriptor = getClassPropertyDescriptor(currentProto.constructor, key);

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
