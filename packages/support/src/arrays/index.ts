/**
 * The maximum number of elements in a collection before switching
 * from nested loops ($O(n^2)$) to `Set` or `Map` lookups ($O(n)$).
 *
 * @internal
 *
 * @description
 * This threshold balances GC pressure against lookup complexity.
 *
 * 1. Performance: Below 16 elements, linear scanning with index-based `for`
 *    loops is often faster due to V8's optimization of contiguous arrays
 *    and lower initialization overhead.
 * 2. Memory: Creating a new `Set` or `Map` instance triggers object
 *    allocation and subsequent Garbage Collection (GC).
 * 3. Scaling: At > 16 elements, the $O(n^2)$ cost of nested loops
 *    begins to significantly degrade performance compared to $O(n)$
 *    hash-table lookups.
 */
export const LOOKUP_THRESHOLD = 16;

export * from './includesAll.js';
export * from './includesAny.js';
export * from './isArrayLike.js';
export * from './isConcatSpreadable.js';
export * from './isSafeArrayLike.js';
export * from './isTypedArray.js';
export * from './merge.js';

export * from './exceptions/index.js';
export * from './merge/index.js';
