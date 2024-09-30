import type { ClassBlueprint } from "@aedart/contracts/support/reflections";

/**
 * Application Configurator ClassBlueprint
 *
 * Defines the minimum members that a target class should contain, before it is
 * considered to "look like" a [Application Configurator]{@link import('@aedart/contracts/core').Configurator}
 *
 * @see ClassBlueprint
 */
export const ConfiguratorClassBlueprint: ClassBlueprint = {
    staticMembers: [
        'constructor'
    ],

    members: [
        'for',
        'apply',
    ]
}