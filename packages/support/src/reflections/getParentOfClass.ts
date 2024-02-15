import { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { FUNCTION_PROTOTYPE } from "@aedart/contracts/support/reflections";
import {isset} from "@aedart/support/misc";

/**
 * Returns the parent class of given target class
 * 
 * **Note**: _If target has a parent that matches
 * [FUNCTION_PROTOTYPE]{@link import('@aedart/contracts/support/reflections').FUNCTION_PROTOTYPE}, then `null` is returned!_
 * 
 * @param {ConstructorOrAbstractConstructor} target The target class
 * 
 * @returns {ConstructorOrAbstractConstructor | null} Parent class or `null`, if target has no parent class.
 * 
 * @throws {TypeError}
 */
export function getParentOfClass(target: ConstructorOrAbstractConstructor): ConstructorOrAbstractConstructor | null
{
    if (!isset(target)) {
        throw new TypeError('getParentOfClass() expects a target class as argument, undefined given');
    }
    
    const parent: object | null = Reflect.getPrototypeOf(target);
    if (parent === FUNCTION_PROTOTYPE) {
        return null;
    }
    
    return parent as ConstructorOrAbstractConstructor;
}