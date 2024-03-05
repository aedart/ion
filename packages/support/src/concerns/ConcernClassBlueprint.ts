import type { ClassBlueprint } from "@aedart/contracts/support/reflections";
import { PROVIDES } from "@aedart/contracts/support/concerns";

/**
 * Concern Class Blueprint
 * 
 * Defines the minimum members that a target class should contain, before it is
 * considered to "look like" a [Concern Class]{@link import('@aedart/contracts/support/concerns').ConcernConstructor}
 * 
 * @see ClassBlueprint
 */
export const ConcernClassBlueprint: ClassBlueprint = {
    staticMembers: [
        'constructor',
        PROVIDES
    ],

    members: [
        'concernOwner'
    ]
};