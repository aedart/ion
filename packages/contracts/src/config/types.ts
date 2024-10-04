/**
 * A key-value store containing configuration items for an application or component.
 */
export type Items = Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */

/**
 * Callback that is responsible for loading configuration {@link Items}.
 */
export type ConfigurationLoaderCallback = () => Promise<Items>;