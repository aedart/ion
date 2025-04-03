import type { ClassBlueprint } from "@aedart/contracts/support/reflections";

/**
 * Input Option ClassBlueprint
 *
 * Defines the minimum members that a target class should contain, before it is
 * considered to "look like" a [Input Option]{@link import('@aedart/contracts/cli').Option}
 *
 * @see ClassBlueprint
 */
export const OptionClassBlueprint: ClassBlueprint = {
    staticMembers: [
        'constructor'
    ],

    members: [
        'name',
        'short',
        'description',
        'valueMode',
        'acceptsValue',
        'isValueRequired',
        'isValueOptional',
        'isNegatable',
        'isArray',
        'setDefault',
        'getDefault',
    ]
}