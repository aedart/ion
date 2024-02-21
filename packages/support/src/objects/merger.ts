import type {
    MergeOptions,
    MergeCallback,
    ObjectsMerger
} from "@aedart/contracts/support/objects";
import Merger from "./merge/Merger";

/**
 * Returns a new objects merger instance
 * 
 * @param {MergeCallback | MergeOptions} [options]
 * 
 * @return {ObjectsMerger}
 */
export function merger(options?: MergeCallback | MergeOptions): ObjectsMerger
{
    return new Merger(options);
}