import { ArrayMergeCallback } from "./types";

/**
 * Array Merge Options
 */
export default interface ArrayMergeOptions
{
    /**
     * Transfer functions
     * 
     * **When `true`**: _functions are transferred into resulting array._
     * 
     * **When `false` (_default behaviour_)**: _The merge operation will fail when a function
     * is encountered (functions are not cloneable by default)._
     * 
     * @type {boolean}
     */
    transferFunctions?: boolean;

    /**
     * Merge callback to be applied
     *
     * **Note**: _When no callback is provided, then the merge function's default
     * callback is used._
     * 
     * @type {ArrayMergeCallback}
     */
    callback?: ArrayMergeCallback;
}