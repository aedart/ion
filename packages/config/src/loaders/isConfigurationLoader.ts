import { isset } from "@aedart/support/misc";
import { isConfigurationLoaderConstructor } from "./isConfigurationLoaderConstructor";
import BaseLoader from "./BaseLoader";

/**
 * @deprecated TODO: Remove this...
 * 
 * Determine if given object is a [Configuration Loader]{@link import('@aedart/contracts/config').Loader}
 *
 * @param {object} instance
 *
 * @returns {boolean}
 */
export function isConfigurationLoader(instance: object): boolean
{
    if (!isset(instance) || typeof instance !== 'object') {
        return false;
    }

    if (instance instanceof BaseLoader) {
        return true;
    }

    if (!Reflect.has(instance, 'constructor')) {
        return false;
    }

    return isConfigurationLoaderConstructor(instance.constructor);
}