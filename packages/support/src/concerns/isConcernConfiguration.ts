import type { Configuration } from "@aedart/contracts/support/concerns";
import { isConcernConstructor } from "./isConcernConstructor";

/**
 * Determine if target a [Concern Configuration]{@link import('@aedart/contracts/support/concerns').Configuration}
 * 
 * @param {object} target
 * @param {boolean} [force=false] If `false` then cached result is returned if available.
 * 
 * @returns {boolean}
 */
export function isConcernConfiguration(target: object, force: boolean = false): boolean
{
    // Note: A Concern Configuration only requires a `concern` property that
    // must be a Concern Constructor.
    
    return typeof target == 'object'
        && target !== null
        && Reflect.has(target, 'concern')
        && isConcernConstructor((target as Configuration).concern, force);
}