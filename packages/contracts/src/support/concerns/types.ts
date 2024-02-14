import Concern from "./Concern";

/**
 * An alias for a property or method in a {@link Concern} class
 */
export type Alias = PropertyKey;

/**
 * A record that defines one or more aliases for a {@link Concern}'s properties or methods.
 * 
 * In this context an "alias" means a property or method that is added onto a target
 * class' prototype and acts as a proxy to the original property or method inside the
 * concern class instance.
 */
export type Aliases<T extends Concern> = Record<T, Alias>;