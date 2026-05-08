import type { ConstructorLike } from '@aedart/contracts';
import { assertHasPrototypeProperty } from './assertHasPrototypeProperty.js';
import { walkPrototype } from './walkPrototype.js';

/**
 * Returns all keys from the target's prototype chain.
 *
 * @param {ConstructorLike} target
 * @param {boolean} [recursive=true] If `true`, then target's parents are traversed and all
 *                                   property keys are returned.
 *
 * @returns {PropertyKey[]} Deduplicated property keys.
 *
 * @throws {TypeError} If target object does not have "prototype" property
 */
export function classOwnKeys(target: ConstructorLike, recursive = true): PropertyKey[]
{
    assertHasPrototypeProperty(target);

    const proto = target.prototype as object;

    if (!recursive) {
        return Reflect.ownKeys(proto);
    }

    const keys: PropertyKey[] = [];
    const seen = new Set<PropertyKey>();

    // Use the generator to stream keys from the nearest prototype upwards.
    // This handles method shadowing naturally (nearest stays, parents are ignored).
    for (const key of walkPrototype(proto)) {
        if (!seen.has(key)) {
            seen.add(key);
            keys.push(key);
        }
    }

    return keys;
}
