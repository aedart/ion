import { classLooksLike } from "@aedart/support/reflections";
import { isset } from "@aedart/support/misc";
import { BindingEntryBlueprint } from "./BindingEntryBlueprint";
import BindingEntry from "./BindingEntry";

/**
 * Determine if given object is a [Binding]{@link import('@aedart/contracts/container').Binding}
 * 
 * @param {object} instance
 * 
 * @returns {boolean}
 */
export function isBinding(instance: object): boolean
{
    if (!isset(instance) || typeof instance !== 'object') {
        return false;
    }
    
    if (instance instanceof BindingEntry) {
        return true;
    }

    if (!Reflect.has(instance, 'constructor')) {
        return false;
    }
    
    return classLooksLike(instance.constructor as object, BindingEntryBlueprint);
}