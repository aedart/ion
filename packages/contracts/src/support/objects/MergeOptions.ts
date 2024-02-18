import type { MergeCallback } from "./types";

/**
 * Merge Options
 */
export default interface MergeOptions
{
    /**
     * Property Keys to be skipped
     * 
     * **Note**: _Defaults to [DEFAULT_MERGE_SKIP_KEYS]{@link import('@aedart/contracts/support/objects').DEFAULT_MERGE_SKIP_KEYS}
     * when not specified._
     * 
     * @type {PropertyKey[]}
     */
    skip?: PropertyKey[];

    /**
     * Flag, overwrite property values with `undefined`.
     * 
     * **When `true` (_default behaviour_)**: _If an existing property value is not `undefined`, it will be overwritten
     * with new value, even if the new value is `undefined`._
     * 
     * **When `false`**: _If an existing property value is not `undefined`, it will NOT be overwritten
     * with new value, if the new value is `undefined`._
     * 
     * @type {boolean}
     */
    overwriteWithUndefined?: boolean;

    /**
     * Flag, merge array properties
     *
     * **When `true`**: _existing array property value is attempted merged with new array value._
     *
     * **When `false` (_default behaviour_)**: _existing array property value is overwritten with new array value_
     * 
     * @type {boolean}
     */
    mergeArrays?: boolean,

    /**
     * The merge callback that must be applied
     * 
     * **Note**: _When no callback is provided, then a default is
     * set by the merge function_
     * 
     * @type {MergeCallback}
     */
    callback?: MergeCallback;
}