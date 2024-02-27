import { CONCERNS } from "@aedart/contracts/support/concerns";
import { isset } from "@aedart/support/misc";

/**
 * Determine if object is of the type [Concerns Owner]{@link import('@aedart/contracts/support/concerns').Owner}
 * 
 * @param {object} instance
 * 
 * @return {boolean}
 */
export function isConcernsOwner(instance: object): boolean
{
    return isset(instance) && Reflect.has(instance, CONCERNS);
}