import { isset } from "@aedart/support/misc";
import { isServiceProviderConstructor } from "./isServiceProviderConstructor";
import ServiceProvider from "./ServiceProvider";

/**
 * Determine if given object is a [ServiceProvider]{@link import('@aedart/contracts/support/services').ServiceProvider}
 * 
 * @param {object} instance
 * 
 * @returns {boolean}
 */
export function isServiceProvider(instance: object): boolean
{
    if (!isset(instance) || typeof instance !== 'object') {
        return false;
    }

    if (instance instanceof ServiceProvider) {
        return true;
    }

    if (!Reflect.has(instance, 'constructor')) {
        return false;
    }
    
    return isServiceProviderConstructor(instance.constructor);
}