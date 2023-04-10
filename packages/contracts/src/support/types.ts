/**
 * Key or path identifier
 */
export type Key = OneOrMany<PropertyKey>;

/**
 * Object Property key
 */
export type PropertyKey = string | number | symbol;

/**
 * One or many
 */
export type OneOrMany<T> = T | ReadonlyArray<T>;