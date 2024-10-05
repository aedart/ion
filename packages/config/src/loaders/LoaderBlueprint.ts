import type { ClassBlueprint } from "@aedart/contracts/support/reflections";

/**
 * @deprecated TODO: Remove this...
 * 
 * Configuration Loader Blueprint
 *
 * Defines the minimum members that a target class should contain, before it is
 * considered to "look like" a [Loader]{@link import('@aedart/contracts/config').Loader}
 *
 * @type {ClassBlueprint}
 */
export const LoaderBlueprint: ClassBlueprint = {
    staticMembers: [
        'constructor'
    ],
    
    members: [
        'load',
    ]
};