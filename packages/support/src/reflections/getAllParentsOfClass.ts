import { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { getParentOfClass } from "./getParentOfClass";
import { isset } from "@aedart/support/misc";

/**
 * Returns all parent classes of given target
 * 
 * @see {getParentOfClass}
 * 
 * @param {ConstructorOrAbstractConstructor} target The target class.
 * @param {boolean} [includeTarget=false] If `true`, then given target is included in the output as the first element.
 * 
 * @returns {ConstructorOrAbstractConstructor[]} List of parent classes, ordered by the top-most parent class first.
 *
 * @throws {TypeError}
 */
export function getAllParentsOfClass(target: ConstructorOrAbstractConstructor, includeTarget: boolean = false): ConstructorOrAbstractConstructor[]
{
    if (!isset(target)) {
        throw new TypeError('getAllParentsOfClass() expects a target class as argument, undefined given');
    }
    
    const output: ConstructorOrAbstractConstructor[] = [];
    if (includeTarget) {
        output.push(target);
    }
    
    let parent: ConstructorOrAbstractConstructor | null = getParentOfClass(target);
    while (parent !== null) {
        output.push(parent);
        
        parent = getParentOfClass(parent);
    }
    
    return output;
}