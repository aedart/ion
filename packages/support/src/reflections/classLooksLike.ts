import type { ClassBlueprint } from "@aedart/contracts/support/reflections";
import type { ConstructorLike } from "@aedart/contracts";
import { includesAll } from "@aedart/support/arrays";
import { hasPrototypeProperty } from "./hasPrototypeProperty";
import { classOwnKeys } from "./classOwnKeys";

/**
 * Determine if target class look like given blueprint.
 * 
 * @param {object} target
 * @param {ClassBlueprint} blueprint
 *
 * @throws {TypeError} If target object does not have "prototype" property. Or, if blueprint does not contain at least
 *                     one member or static member.
 */
export function classLooksLike(target: object, blueprint: ClassBlueprint): boolean
{
    if (!hasPrototypeProperty(target)) {
        return false;
    }
    
    // Abort if both blueprint does not define either members or static members property
    const hasBlueprintStaticMembers: boolean = Reflect.has(blueprint, 'staticMembers');
    const hasBlueprintMembers: boolean = Reflect.has(blueprint, 'members');

    if (!hasBlueprintStaticMembers && !hasBlueprintMembers) {
        throw new TypeError('Blueprint must at least have a "members" or "staticMembers" property defined');
    }
    
    // Abort if both members and static members properties are empty
    const amountStaticMembers = blueprint?.staticMembers?.length || 0;
    const amountMembers = blueprint?.members?.length || 0;

    // Check for static members
    let hasAllStaticMembers: boolean = false;
    if (amountStaticMembers > 0) {
        for (const staticMember of (blueprint.staticMembers as PropertyKey[])) {
            if (!Reflect.has(target as object, staticMember)) {
                return false;
            }
        }

        hasAllStaticMembers = true;
    }

    // Check for members
    if (amountMembers > 0) {
        // We can return here, because static members have been checked and code aborted if a member
        // was missing...
        return includesAll(
            classOwnKeys(target as ConstructorLike, true),
            (blueprint.members as PropertyKey[])
        );
    }
        
    // Otherwise, if there were any static members and all a present in target, then
    // check passes.
    return amountStaticMembers > 0 && hasAllStaticMembers;
}