import ArrayMergeOptions from './ArrayMergeOptions.js';

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
    options: Readonly<ArrayMergeOptions>,
) => any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

/**
 * Intersect Arrays
 *
 * Recursive type that intersects a tuple of array types into a single
 * intersected array type.
 *
 * @template T - Tuple of array types
 */
export type IntersectArrays<T extends any[][]> = T extends [infer Head, ...infer Tail]
    ? Tail extends any[][] ? Tail['length'] extends 0 ? Head
        : Head & IntersectArrays<Tail>
    : Head
    : any[];
