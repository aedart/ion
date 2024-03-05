import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import type { ClassBlueprint } from "@aedart/contracts/support/reflections";
import { isSubclass } from "./isSubclass";
import { classLooksLike } from "./classLooksLike";

/**
 * Determine if target class is a subclass of given superclass, or if it looks like given blueprint
 *
 * **Note**: _Method is an alias for `isSubclass(target, superclass) || classLooksLike(target, blueprint)`._
 * 
 * @see isSubclass
 * @see classLooksLike
 * 
 * @param {object} target
 * @param {ConstructorOrAbstractConstructor} superclass
 * @param {ClassBlueprint} blueprint
 * 
 * @throws {TypeError}
 */
export function isSubclassOrLooksLike(
    target: object,
    superclass: ConstructorOrAbstractConstructor,
    blueprint: ClassBlueprint
): boolean
{
    return isSubclass(target, superclass) || classLooksLike(target, blueprint);
}