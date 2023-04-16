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

/**
 * A custom "testing" method for matching given value
 */
export type ValueMatchFunction = (value: unknown) => boolean;

/**
 * Callback to be invoked when a value has been matched
 */
export type MatchHandler<T> = (value: unknown) => T | undefined;