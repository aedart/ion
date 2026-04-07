import type { ConstructorLike } from "@aedart/contracts";
import { assertHasPrototypeProperty } from "./assertHasPrototypeProperty.js";
import { getAllParentsOfClass } from "./getAllParentsOfClass.js";

/**
 * Returns property keys that are defined in target's prototype
 *
 * @param {ConstructorLike} target
 * @param {boolean} [recursive=false] If `true`, then target's parents are traversed and all
 *                                    property keys are returned.
 *
 * @returns {PropertyKey[]}
 *
 * @throws {TypeError} If target object does not have "prototype" property
 */
export function classOwnKeys(target: ConstructorLike, recursive: boolean = false): PropertyKey[]
{
    assertHasPrototypeProperty(target);

    if (!recursive)
    {
        return Reflect.ownKeys(target.prototype);
    }

    const ownKeys: Set<PropertyKey> = new Set();
    const parents = getAllParentsOfClass(target, true);
    const parentsCount = parents.length;

    for (let i = 0; i < parentsCount; i++)
    {
        const keys = Reflect.ownKeys(parents[i].prototype);
        const keysCount = keys.length;

        for (let j = 0; j < keysCount; j++)
        {
            ownKeys.add(keys[j]);
        }
    }

    return Array.from(ownKeys);
}
