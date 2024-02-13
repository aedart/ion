import Concern from "./Concern";

/**
 * A record that defines one or more aliases for a {@link Concern}'s properties or methods.
 */
export type Aliases<T extends Concern> = {
    [P in keyof T]: PropertyKey
}