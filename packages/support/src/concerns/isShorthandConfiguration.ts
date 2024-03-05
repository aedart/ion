import type { ShorthandConfiguration } from "@aedart/contracts/support/concerns";
import { isConcernConstructor } from "./isConcernConstructor";

/**
 * Determine if target a [Shorthand Concern Configuration]{@link import('@aedart/contracts/support/concerns').ShorthandConfiguration}
 *
 * @param {object} target
 * @param {boolean} [force=false] If `false` then cached result is returned if available.
 *
 * @returns {boolean}
 */
export function isShorthandConfiguration(target: object, force: boolean = false): boolean
{
    // Note: A Concern Configuration (shorthand) only requires a
    // Concern Constructor as its first value.
    
    return Array.isArray(target)
        && target.length > 0
        && isConcernConstructor((target as ShorthandConfiguration)[0], force);
}