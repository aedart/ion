import type { ConstructorLike } from "@aedart/contracts";
import { hasPrototypeProperty } from "./hasPrototypeProperty";

/**
 * Determine if target class is a subclass (_child class_) of given superclass (_parent class_)
 * 
 * **Note**: _Method determines if target is a child of given superclass, by checking if the `target.prototype`
 * is an instance of given superclass (`target.prototype instanceof superclass`)
 * However, if given target or superclass does not have a prototype property, then `false` is returned._
 * 
 * @param {object} target
 * @param {ConstructorLike} superclass
 * 
 * @returns {boolean} `true` if target is a subclass of given superclass, `false` otherwise.  
 */
export function isSubclass(target: object, superclass: ConstructorLike): boolean
{
    if (!hasPrototypeProperty(target) || !hasPrototypeProperty(superclass) || target === superclass) {
        return false;
    }

    return (target as Record<PropertyKey, unknown>).prototype instanceof superclass;
}