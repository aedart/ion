import { isset } from "@aedart/support/misc";
import { isSubclassOrLooksLike } from "@aedart/support/reflections";
import { ServiceProviderClassBlueprint } from "./ServiceProviderClassBlueprint";
import ServiceProvider from "./ServiceProvider";

/**
 * Determine if given target is a [Service Provider Constructor]{@link import('@aedart/contracts/support/services').ServiceProviderConstructor}.
 * 
 * @param {any} target
 * 
 * @returns {boolean}
 */
export function isServiceProviderConstructor(
    target: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    if (!isset(target) || typeof target !== 'function') {
        return false;
    }
    
    return isSubclassOrLooksLike(target, ServiceProvider, ServiceProviderClassBlueprint);
}