import { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import Concern from "./Concern";
import ConcernConstructor from "./ConcernConstructor";

/**
 * An alias for a property or method in a {@link Concern} class
 */
export type Alias = PropertyKey;

/**
 * Key-value pair where the key corresponds to a property or method inside the {@link Concern} instance,
 * and value is an "alias" for that property or method.
 *
 * In this context an "alias" means a property or method that is added onto a target
 * class' prototype and acts as a proxy to the original property or method inside the
 * concern class instance. 
 */
export type Aliases<T extends Concern> = {
    [K in keyof T]: Alias
};

/**
 * A list of concern classes and their owner class in which they are used.
 */
export type ConcernClasses = Map<ConcernConstructor, ConstructorOrAbstractConstructor>