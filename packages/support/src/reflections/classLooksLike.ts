import type {ClassBlueprint} from "@aedart/contracts/support/reflections";
import {hasPrototypeProperty} from "./hasPrototypeProperty.js";

/**
 * Determine if target class looks like given blueprint.
 *
 * @param {object} target
 * @param {ClassBlueprint} blueprint
 *
 * @throws {TypeError} If blueprint is invalid or lacks required array properties.
 */
export function classLooksLike(target: object, blueprint: ClassBlueprint): boolean
{
    const staticMembers = blueprint.staticMembers;
    const members = blueprint.members;

    const isStaticArray: boolean = Array.isArray(staticMembers);
    const isMembersArray: boolean = Array.isArray(members);

    // Validation: Ensure blueprint has at least one valid member array
    if (!isStaticArray && !isMembersArray) {
        throw new TypeError('Blueprint must define "members" or "staticMembers" as arrays');
    }

    const numStatic: number = isStaticArray ? (staticMembers as PropertyKey[]).length : 0;
    const numMembers: number = isMembersArray ? (members as PropertyKey[]).length : 0;

    // Validation: Ensure the blueprint isn't just empty arrays
    if (numStatic === 0 && numMembers === 0) {
        throw new TypeError('Blueprint must contain at least one member to check');
    }

    // Target must have a prototype to be considered a class/constructor for this check
    if (!hasPrototypeProperty(target)) {
        return false;
    }

    // Check static members on the constructor (target)
    if (numStatic > 0) {
        const list: PropertyKey[] = staticMembers as PropertyKey[];
        for (let i = 0; i < numStatic; i++) {
            if (!Reflect.has(target, list[i])) {
                return false;
            }
        }
    }

    // Check instance members on the prototype
    if (numMembers > 0) {
        const proto: object = (target as any).prototype;
        const list: PropertyKey[] = members as PropertyKey[];
        for (let j = 0; j < numMembers; j++) {
            if (!Reflect.has(proto, list[j])) {
                return false;
            }
        }
    }

    return true;
}
