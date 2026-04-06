/**
 * Key or path identifier
 */
export type Key = OneOrMany<PropertyKey>;

/**
 * One or many
 */
export type OneOrMany<T> = T | ReadonlyArray<T>;