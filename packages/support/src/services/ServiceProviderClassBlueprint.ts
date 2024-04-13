import type { ClassBlueprint } from "@aedart/contracts/support/reflections";

/**
 * Service Provider ClassBlueprint
 *
 * Defines the minimum members that a target class should contain, before it is
 * considered to "look like" a [Service Provider]{@link import('@aedart/contracts/support/services').ServiceProviderConstructor}
 * 
 * @see ClassBlueprint
 */
export const ServiceProviderClassBlueprint: ClassBlueprint = {
    staticMembers: [
        'constructor'
    ],
    
    members: [
        'register'
    ]
}