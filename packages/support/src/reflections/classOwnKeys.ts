import type {ConstructorOrAbstractConstructor} from "@aedart/contracts";
import { assertHasPrototypeProperty } from "@aedart/support/reflections/assertHasPrototypeProperty";
import { getAllParentsOfClass } from "@aedart/support/reflections/getAllParentsOfClass";

/**
 * Returns property keys that are defined target's prototype
 * 
 * @param {ConstructorOrAbstractConstructor} target
 * @param {boolean} [recursive=false] If `true`, then target's parent prototypes are traversed and all
 *                                    property keys are returned.
 * 
 * @returns {PropertyKey[]}
 *
 * @throws {TypeError} If target object does not have "prototype" property
 */
export function classOwnKeys(target: ConstructorOrAbstractConstructor, recursive: boolean = false): PropertyKey[]
{
    assertHasPrototypeProperty(target);
    
    if (!recursive) {
        return Reflect.ownKeys(target.prototype);
    }
    
    // Obtain target's parent classes...
    const parents = getAllParentsOfClass(target.prototype, true);
    
    const ownKeys: Set<PropertyKey> = new Set();
    for (const parent of parents) {
        const keys: PropertyKey[] = Reflect.ownKeys(parent.prototype);
        for (const key of keys) {
            ownKeys.add(key);
        }
    }
    
    return Array.from(ownKeys);
}