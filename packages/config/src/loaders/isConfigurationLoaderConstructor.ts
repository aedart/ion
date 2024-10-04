import type { ConstructorLike } from "@aedart/contracts";
import { isset } from "@aedart/support/misc";
import { isSubclassOrLooksLike } from "@aedart/support/reflections";
import BaseLoader from "./BaseLoader";
import { LoaderBlueprint } from "./LoaderBlueprint";

/**
 * Determine if target is a [Configuration Loader Constructor]{@link import('@aedart/contracts/config').LoaderConstructor}
 * 
 * @param {any} target
 * 
 * @return {boolean}
 */
export function isConfigurationLoaderConstructor(
    target: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    if (!isset(target) || typeof target !== 'function') {
        return false;
    }

    return isSubclassOrLooksLike(target, BaseLoader as ConstructorLike, LoaderBlueprint);
}