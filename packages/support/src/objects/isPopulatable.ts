import { hasMethod } from "@aedart/support/reflections";

/**
 * Determine if target is populatable
 *
 * **Note**: _Method assumes that target is populatable if it implements the
 * [Populatable]{@link import('@aedart/constracts/support/objects').Populatable} interface._
 * 
 * @param {object} target
 * 
 * @return {boolean}
 */
export function isPopulatable(target: object): boolean
{
    return hasMethod(target, 'populate');
}