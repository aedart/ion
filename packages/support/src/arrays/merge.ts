import type { ArrayMerger, IntersectArrays } from '@aedart/contracts/support/arrays';
import Merger from './merge/Merger.js';

/**
 * Merge two or more arrays, or return a new Array Merger instance.
 *
 * **Note**: _Method performs deep copies of array values via structuredClone() or the CLONE symbol._
 *
 * @param {...unknown[]} sources
 *
 * @return {ArrayMerger | unknown[]}
 *
 * @throws {ArrayMergeException}
 */
export function merge<T extends unknown[][]>(...sources: T): T['length'] extends 0 ? ArrayMerger
    : IntersectArrays<T>;
export function merge(...sources: unknown[]): ArrayMerger | unknown[]
{
    const merger = new Merger();

    if (sources.length === 0) {
        return merger;
    }

    return merger.of(...(sources as unknown[][])) as unknown[];
}
