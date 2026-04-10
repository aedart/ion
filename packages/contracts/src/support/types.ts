/**
 * Key or path identifier
 */
export type Key = OneOrMany<PropertyKey>;

/**
 * One or many
 */
export type OneOrMany<T> = T | ReadonlyArray<T>;

/**
 * Wildcard identifier
 *
 * Often used to denote that "all" properties, elements or items are
 * allowed or supported as argument for a function or method.
 */
export type Wildcard = '*';
