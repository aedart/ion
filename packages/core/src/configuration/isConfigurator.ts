import { isset } from "@aedart/support/misc";
import { isConfiguratorConstructor } from "./isConfiguratorConstructor";
import BaseConfigurator from "./BaseConfigurator";

/**
 * Determine if given object is a [Application Configurator]{@link import('@aedart/contracts/core').Configurator}
 *
 * @param {object} instance
 *
 * @returns {boolean}
 */
export function isConfigurator(instance: object): boolean
{
    if (!isset(instance) || typeof instance !== 'object') {
        return false;
    }

    if (instance instanceof BaseConfigurator) {
        return true;
    }

    if (!Reflect.has(instance, 'constructor')) {
        return false;
    }

    return isConfiguratorConstructor(instance.constructor);
}