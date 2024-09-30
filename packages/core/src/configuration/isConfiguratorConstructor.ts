import { isset } from "@aedart/support/misc";
import { isSubclassOrLooksLike } from "@aedart/support/reflections";
import BaseConfigurator from "./BaseConfigurator";
import { ConfiguratorClassBlueprint } from "./ConfiguratorClassBlueprint";

/**
 * Determine if given target is a [Application Configurator Constructor]{@link import('@aedart/contracts/core').Configurator}.
 *
 * @param {any} target
 *
 * @returns {boolean}
 */
export function isConfiguratorConstructor(
    target: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    if (!isset(target) || typeof target !== 'function') {
        return false;
    }

    return isSubclassOrLooksLike(target, BaseConfigurator, ConfiguratorClassBlueprint);
}