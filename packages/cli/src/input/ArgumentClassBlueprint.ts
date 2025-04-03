import type { ClassBlueprint } from "@aedart/contracts/support/reflections";

/**
 * Input Argument ClassBlueprint
 *
 * Defines the minimum members that a target class should contain, before it is
 * considered to "look like" a [Input Argument]{@link import('@aedart/contracts/cli').Argument}
 * 
 * @see ClassBlueprint
 */
export const ArgumentClassBlueprint: ClassBlueprint = {
    staticMembers: [
        'constructor'
    ],

    members: [
        'name',
        'description',
        'isRequired',
        'isOptional',
        'isArray',
        'setDefault',
        'getDefault',
    ]
}