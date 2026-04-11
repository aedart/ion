import type {ArrayMerger, IntersectArrays} from "@aedart/contracts/support/arrays";
import Merger from "./merge/Merger.js";

/**
 * Merge two or more arrays, or return a new Array Merger instance.
 *
 * **Note**: _Method performs deep copies of array values via structuredClone() or the CLONE symbol._
 *
 * @param {...any[]} sources
 *
 * @return {ArrayMerger | any[]}
 *
 * @throws {ArrayMergeException}
 */
export function merge<T extends any[][]>(...sources: T): T['length'] extends 0
    ? ArrayMerger
    : IntersectArrays<T>;
export function merge(...sources: any[]): ArrayMerger | any[]
{
    const merger = new Merger();

    if (sources.length === 0) {
        return merger;
    }

    return merger.of(...sources) as any[];
}
