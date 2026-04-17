/**
 * Alias Configuration
 *
 * Key is the original property name, Value is the new alias
 */
export type AliasMap = Record<PropertyKey, PropertyKey>;

/**
 * Symbol used to identify a class as being a valid Concern.
 */
export const CONCERN_CLASS: unique symbol = Symbol(
    '@aedart/contracts/support/concerns/concern-class',
);

/**
 * Symbol used to store the Concern Registry (Set of constructors) on a target class.
 * This is used by external utilities like `usesConcerns()`.
 */
export const CONCERN_REGISTRY: unique symbol = Symbol(
    '@aedart/contracts/support/concerns/registry',
);

/**
 * Symbol used to store information about applied aliases.
 * Useful for debugging and preventing naming collisions in deep inheritance.
 */
export const APPLIED_ALIASES: unique symbol = Symbol(
    '@aedart/contracts/support/concerns/applied-aliases',
);
