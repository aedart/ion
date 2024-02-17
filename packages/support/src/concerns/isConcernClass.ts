import { getClassPropertyDescriptors } from "@aedart/support/reflections";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";

/**
 * In-memory cache of classes that are determined to be of the type [Concern]{@link import('@aedart/contracts/support/concerns').Concern} 
 * 
 * @type {WeakSet<object>}
 */
const concernClassCache: WeakSet<object> = new WeakSet<object>();

/**
 * Determine if given target is a [Concern]{@link import('@aedart/contracts/support/concerns').Concern} class
 * 
 * @param {object} target
 * @param {boolean} [force=false] If `false` then cached result is returned
 * 
 * @returns {boolean}
 */
export function isConcernClass(target: object, force: boolean = false): boolean
{
    if (!force && concernClassCache.has(target)) {
        return true;
    }

    try {
        const descriptors = getClassPropertyDescriptors(target as ConstructorOrAbstractConstructor, true);
        
        if (Reflect.has(descriptors, 'concernOwner')) {
            concernClassCache.add(parent);
            return true;            
        }
        
        return false;
    } catch (error) {
        return false;
    }
}