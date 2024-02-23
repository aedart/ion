import {isSubclass, getClassPropertyDescriptors, classOwnKeys} from "@aedart/support/reflections";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { PROVIDES } from "@aedart/contracts/support/concerns";
import { isset } from "@aedart/support/misc";
import AbstractConcern from "./AbstractConcern";

/**
 * In-memory cache of classes that are determined to be of the type [Concern Constructor]{@link import('@aedart/contracts/support/concerns').ConcernConstructor} 
 * 
 * @type {WeakSet<object>}
 */
const concernClassCache: WeakSet<object> = new WeakSet<object>();

/**
 * TODO: INCOMPLETE
 * 
 * Determine if given target is a [Concern Constructor]{@link import('@aedart/contracts/support/concerns').ConcernConstructor}
 * 
 * @param {object} target
 * @param {boolean} [force=false] If `false` then cached result is returned
 * 
 * @returns {boolean}
 */
export function isConcernConstructor(target: object, force: boolean = false): boolean
{
    if (!isset(target) || typeof target !== 'object' || Array.isArray(target)) {
        return false;
    }
    
    if (!force && concernClassCache.has(target)) {
        return true;
    }

    // Easiest way to determine is be checking if target is a subclass of Abstract Concern
    if (isSubclass(target, AbstractConcern)) {
        concernClassCache.add(target);
        return true;
    }

    // If a custom implementation is used, then certain static members must be available
    const requiredStaticMembers: PropertyKey[] = [
        PROVIDES
    ];

    const staticKeys: PropertyKey[] = Reflect.ownKeys(target); // TODO: BAD... what about inherited???
    for (const staticMember of requiredStaticMembers) {
        if (!staticKeys.includes(staticMember)) {
            console.log('Does not contain', staticMember, 'in', target, ' - static members', staticKeys);
            return false;
        }
    }
    
    // Secondly, the custom concern class must also have certain members available on its prototype
    const requiredMembers: PropertyKey[] = [
        'concernOwner'
    ];
    
    const classKeys: PropertyKey[] = classOwnKeys(target as ConstructorOrAbstractConstructor, true);
    for (const member of requiredMembers) {
        if (!classKeys.includes(member)) {
            return false;
        }
    }
    
    // Thus, if all required members are available then the given target is a valid concern class.
    concernClassCache.add(target);
    return true;
}