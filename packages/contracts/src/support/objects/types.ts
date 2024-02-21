import type {
    MergeOptions,
    MergeSourceInfo
} from "./merge";

/**
 * Callback to perform the merging of nested objects.
 * Invoking this callback results in the merge callback to
 * be repeated, for the given source objects.
 * 
 * @type {function}
 */
export type NextCallback = (
    
    /**
     * The nested objects to be merged
     *
     * @type {object[]}
     */
    sources: object[],

    /**
     * The merge options to be applied
     * 
     * @type {Readonly<MergeOptions>}
     */
    options: Readonly<MergeOptions>,

    /**
     * The next recursion depth number
     *
     * @type {number}
     */
    nextDepth: number
) => any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

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
    
    /**
     * Source target information
     * 
     * @type {MergeSourceInfo}
     */
    target: MergeSourceInfo,

    /**
     * Callback to invoke for merging nested objects
     * 
     * @type {function}
     */
    next: NextCallback,
    
    /**
     * The merge options to be applied 
     */
    options: Readonly<MergeOptions>
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