import MergeOptions from "./MergeOptions";

/**
 * Merge callback function
 * 
 * The callback is responsible for resolving the value to be merged into the resulting object.
 * 
 * **Note**: _[Skipped keys]{@link MergeOptions.skip} are NOT provided to the callback._
 * 
 * **Note**: _The callback is responsible for respecting the given [options]{@link MergeOptions},
 * ([keys to be skipped]{@link MergeOptions.skip} and [depth]{@link MergeOptions.depth} excluded)_
 */
export type MergeCallback = (
    result: object,
    key: PropertyKey,
    value: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    source: object,
    sourceIndex: number,
    depth: number,
    options: MergeOptions
) => any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

/**
 * A callback that determines if property key should be skipped
 * 
 * If the callback returns `true`, then the given key will NOT be merged
 * from the given source object.
 * 
 * @see {MergeOptions}
 */
export type SkipKeyCallback = (key: PropertyKey, source: object, result: object) => boolean;