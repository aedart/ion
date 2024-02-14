import Concern from "./Concern";

/**
 * A record that defines one or more aliases for a {@link Concern}'s properties or methods.
 * 
 * In this context an "alias" means a property or method name that is added onto a target
 * class' prototype and acts as a proxy to the original property or method inside the
 * concern class.
 */
export type Aliases<T extends Concern> = {
    [P in keyof T]: PropertyKey
}