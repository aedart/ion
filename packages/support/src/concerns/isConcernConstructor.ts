import { isSubclassOrLooksLike} from "@aedart/support/reflections";
import { isset } from "@aedart/support/misc";
import AbstractConcern from "./AbstractConcern";
import { ConcernClassBlueprint } from "./ConcernClassBlueprint";

/**
 * In-memory cache of classes that are determined to be of the type
 * [Concern Constructor]{@link import('@aedart/contracts/support/concerns').ConcernConstructor}.
 * 
 * @type {WeakSet<object>}
 */
const concernConstructorsCache: WeakSet<object> = new WeakSet<object>();

/**
 * Determine if given target is a
 * [Concern Constructor]{@link import('@aedart/contracts/support/concerns').ConcernConstructor}.
 * 
 * @param {any} target
 * @param {boolean} [force=false] If `false` then cached result is returned if available.
 * 
 * @returns {boolean}
 */
export function isConcernConstructor(
    target: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    force: boolean = false
): boolean
{
    if (!isset(target) || typeof target !== 'function') {
        return false;
    }
    
    if (!force && concernConstructorsCache.has(target)) {
        return true;
    }

    if (isSubclassOrLooksLike(target, AbstractConcern, ConcernClassBlueprint)) {
        concernConstructorsCache.add(target);
        return true;
    }

    return false;
}