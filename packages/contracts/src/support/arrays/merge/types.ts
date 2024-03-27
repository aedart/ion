import ArrayMergeOptions from "./ArrayMergeOptions";

/**
 * Array Merge Callback
 */
export type ArrayMergeCallback = (
    /**
     * The current element being processed in the array
     * 
     * @type {any}
     */
    element: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * The index of the current element being processed in the array.
     * 
     * @type {number}
     */
    index: number,

    /**
     * The concatenated array this callback was called upon
     * 
     * @type {any[]}
     */
    array: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * The merge options to be applied
     * 
     * @type {Readonly<ArrayMergeOptions>}
     */
    options: Readonly<ArrayMergeOptions>
) => any; /* eslint-disable-line @typescript-eslint/no-explicit-any */