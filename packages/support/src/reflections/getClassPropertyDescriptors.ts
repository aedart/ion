import type {ConstructorLike} from "@aedart/contracts";
import {assertHasPrototypeProperty} from "./assertHasPrototypeProperty.js";
import {walkParents} from "./walkParents.js";
import { populateDescriptors } from "./populateDescriptors.js";

/**
 * Returns all property descriptors that are defined on the target's prototype chain.
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

    const output: Record<PropertyKey, PropertyDescriptor> = Object.create(null);

    // If not recursive, we only care about the immediate prototype.
    if (!recursive) {
        return populateDescriptors(output, target.prototype);
    }
    
    // To respect the inheritance priority (child overrides parent), we collect
    // the chain first.
    const chain: any[] = [];
    for (const parent of walkParents(target.prototype, true)) {
        chain.push(parent);
    }

    // Since walkParents yields nearest parent first, we
    // iterate the chain in reverse order to ensure child descriptors
    // win or are merged onto parent descriptors.
    for (let i = chain.length - 1; i >= 0; i--) {
        populateDescriptors(output, chain[i]);
    }

    return output;
}

