import { ArrayMergeCallback } from './types.js';

/**
 * Array Merge Options
 */
export default interface ArrayMergeOptions {
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

    /**
     * Use CLONE symbol
     *
     * **When `true`**: _The merge operation will attempt to use the `CLONE` symbol
     * for deep cloning, if available on the element._
     *
     * @see Cloneable
     * @see MergeOptions.clone
     */
    clone?: boolean;
}
