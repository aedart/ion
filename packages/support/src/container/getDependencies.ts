import type { Identifier } from "@aedart/contracts/container";
import { DEPENDENCIES } from "@aedart/contracts/container";
import { getTargetMeta } from "@aedart/support/meta";


/**
 * Returns the defined dependencies for given target
 * 
 * @param {object} target
 * 
 * @return {Identifier[]} Empty identifiers list, if none defined for target
 */
export function getDependencies(target: object): Identifier[]
{
    return getTargetMeta<
        Identifier[],
        Identifier[]
    >(target, DEPENDENCIES, []) as Identifier[];
}