/**
 * A key-value store containing configuration items for an application or component.
 */
export type Items = Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */

/**
 * A [module-name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#modulename) from
 * where configuration {@link Items} are to be loaded from.
 */
export type ConfigurationPath = string;

/**
 * Callback that is responsible for loading configuration {@link Items}.
 */
export type ConfigurationLoaderCallback = () => Promise<Items>;