import ArrayMergeOptions from './ArrayMergeOptions.js';
import { ArrayMergeCallback, IntersectArrays } from './types.js';

/**
 * Array Merger
 *
 * Able to merge (deep merge) multiple source arrays into a single new array.
 */
export default interface ArrayMerger {
    /**
     * Use the following merge options or callback
     *
     * @param {ArrayMergeCallback | ArrayMergeOptions} [options]
     *
     * @return {this}
     *
     * @throws {ArrayMergeException}
     */
    using(options?: ArrayMergeCallback | ArrayMergeOptions): this;

    /**
     * Returns a merger of given source arrays
     *
     * @template T extends any[][]
     *
     * @param {...T} sources
     *
     * @returns {IntersectArrays<T>}
     *
     * @throws {ArrayMergeException}
     */
    of<T extends any[][]>(...sources: T): IntersectArrays<T>;
}
