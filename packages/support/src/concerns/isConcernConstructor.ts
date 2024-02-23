import {isSubclass, classOwnKeys} from "@aedart/support/reflections";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { PROVIDES } from "@aedart/contracts/support/concerns";
import { isset } from "@aedart/support/misc";
import AbstractConcern from "./AbstractConcern";

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

    // Easiest way to determine is be checking if target is a subclass of Abstract Concern
    if (isSubclass(target, AbstractConcern)) {
        concernConstructorsCache.add(target);
        return true;
    }

    // However, if given target is a custom implementation, then there are a few members
    // that MUST be available, before it can be considered a concern constructor 
    const staticMembers: PropertyKey[] = [ PROVIDES ];
    const members: PropertyKey[] = [ 'concernOwner' ];

    // Abort if static members are not available...
    for (const staticMember of staticMembers) {
        if (!Reflect.has(target as object, staticMember)) {
            return false;
        }
    }

    // Abort if members are not available...
    const classKeys: PropertyKey[] = classOwnKeys(target as ConstructorOrAbstractConstructor, true);
    for (const member of members) {
        if (!classKeys.includes(member)) {
            return false;
        }
    }
    
    // Thus, if all required members are available then the given target is a valid concern class.
    concernConstructorsCache.add(target);
    return true;
}