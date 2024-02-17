import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { hasPrototypeProperty } from "./hasPrototypeProperty";

/**
 * Determine if target class is a subclass (_child class_) of given superclass (_parent class_)
 * 
 * @param {object} target
 * @param {ConstructorOrAbstractConstructor} superclass
 * 
 * @returns {boolean} `true` if target is a subclass of given superclass, `false` otherwise.  
 */
export function isSubclass(target: object, superclass: ConstructorOrAbstractConstructor): boolean
{
    if (!hasPrototypeProperty(target) || !hasPrototypeProperty(superclass) || target === superclass) {
        return false;
    }

    return target.prototype instanceof superclass;
}