/**
 * Key or path identifier
 */
export type Key = PropertyKey | (PropertyKey)[];

/**
 * One or many
 */
export type OneOrMany<T> = T | readonly T[];

/**
 * Wildcard identifier
 *
 * Often used to denote that "all" properties, elements or items are
 * allowed or supported as argument for a function or method.
 */
export const WILDCARD = '*' as const;
export type Wildcard = typeof WILDCARD & { readonly __brand: 'Wildcard'; };
