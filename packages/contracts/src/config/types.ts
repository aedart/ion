/**
 * A key-value store containing configuration items for an application, its service, and or component.
 */
export type Items = Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */

/**
 * Callback that is responsible for resolving configuration {@link Items}.
 */
export type ResolveCallback = () => Promise<Items>;

/**
 * A source that ultimately must resolve into configuration {@link Items}.
 */
export type Source = Items | Promise<Items> | ResolveCallback;