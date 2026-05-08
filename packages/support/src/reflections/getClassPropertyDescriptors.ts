import type { ConstructorLike } from '@aedart/contracts';
import { assertHasPrototypeProperty } from './assertHasPrototypeProperty.js';
import { populateDescriptors } from './populateDescriptors.js';
import { walkParents } from './walkParents.js';

/**
 * Returns all property descriptors defined on the target's prototype chain.
 *
 * @param {ConstructorLike} target - The target class.
 * @param {boolean} [recursive=false] - If `true`, the target's parent prototypes are traversed.
 *
 * @returns {Record<PropertyKey, PropertyDescriptor>}
 *
 * @throws {TypeError}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
 */
export function getClassPropertyDescriptors(
    target: ConstructorLike,
    recursive = false,
): Record<PropertyKey, PropertyDescriptor>
{
    assertHasPrototypeProperty(target);
    const output = Object.create(null) as Record<PropertyKey, PropertyDescriptor>; 

    // If not recursive, we only care about the immediate prototype.
    if (!recursive) {
        return populateDescriptors(output, target.prototype as object);
    }

    // To respect the inheritance priority (child overrides parent), we collect
    // the chain first.
    const chain: ConstructorLike[] = [];
    for (const parent of walkParents(target, true)) {
        chain.push(parent);
    }

    // Since walkParents yields nearest parent first, we iterate the chain in
    // reverse order to ensure child descriptors win or are merged onto parent descriptors.
    for (let i = chain.length - 1; i >= 0; i--) {
        populateDescriptors(output, chain[i]);
    }

    return output;
}
