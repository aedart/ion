import { DEPENDENCIES } from "@aedart/contracts/container";
import { hasTargetMeta } from "@aedart/support/meta";

/**
 * Determine if target has dependencies defined
 * 
 * @see dependencies
 * 
 * @param {object} target
 * 
 * @return {boolean}
 */
export function hasDependencies(target: object): boolean
{
    return hasTargetMeta(target, DEPENDENCIES);
}