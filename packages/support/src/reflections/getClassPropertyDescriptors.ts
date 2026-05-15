import type { ConstructorLike } from '@aedart/contracts';
import { assertHasPrototypeProperty } from './assertHasPrototypeProperty.js';
import { populateDescriptors } from './populateDescriptors.js';
import { walkParents } from './walkParents.js';

/**
 * Returns all property descriptors defined in the target.
 *
 * @param {ConstructorLike} target - The target class.
 * @param {boolean} [recursive=false] - If `true`, the target's parents are traversed.
 * @param {boolean} [fromPrototype=true] - If `true`, property descriptors from the target's prototype is returned.
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
    fromPrototype = true,
): Record<PropertyKey, PropertyDescriptor>
{
    assertHasPrototypeProperty(target);
    const output = Object.create(null) as Record<PropertyKey, PropertyDescriptor>;

    // If not recursive, we only care about the immediate target.
    if (!recursive) {
        const from = fromPrototype
            ? target.prototype as object
            : target as object;

        return populateDescriptors(output, from);
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
        const from = fromPrototype
            ? chain[i].prototype as object
            : chain[i] as object;
        
        populateDescriptors(output, from);
    }

    return output;
}
