import ArrayMergeOptions from './ArrayMergeOptions.js';

/**
 * Array Merge Callback
 */
export type ArrayMergeCallback = (
    /**
     * The current element being processed in the array
     *
     * @type {unknown}
     */
    element: unknown,
    /**
     * The index of the current element being processed in the array.
     *
     * @type {number}
     */
    index: number,
    /**
     * The concatenated array this callback was called upon
     *
     * @type {unknown[]}
     */
    array: unknown[],
    /**
     * The merge options to be applied
     *
     * @type {Readonly<ArrayMergeOptions>}
     */
    options: Readonly<ArrayMergeOptions>,
) => unknown;

/**
 * Intersect Arrays
 *
 * Recursive type that intersects a tuple of array types into a single
 * intersected array type.
 *
 * @template T - Tuple of array types
 */
export type IntersectArrays<T extends unknown[][]> = T extends [infer Head, ...infer Tail]
    ? Tail extends unknown[][] ? Tail['length'] extends 0 ? Head
        : Head & IntersectArrays<Tail>
    : Head
    : unknown[];
