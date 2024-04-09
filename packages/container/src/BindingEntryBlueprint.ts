import type { ClassBlueprint } from "@aedart/contracts/support/reflections";

/**
 * Binding Entry Blueprint
 * 
 * Defines the minimum members that a target class should contain, before it is
 * considered to "look like" a [Binding]{@link import('@aedart/contracts/container').Binding}
 * 
 * @type {ClassBlueprint}
 */
export const BindingEntryBlueprint: ClassBlueprint = {
    members: [
        'identifier',
        'value',
        'shared',
        'isFactoryCallback',
        'isConstructor'
    ]
};