import type {
    MergeOptions,
    MergeCallback,
} from "@aedart/contracts/support/objects";
import { merger } from './merger'

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 * 
 * @param {object[]} sources
 * @param {MergeCallback | MergeOptions} [options] Merge callback or merge options.
 *
 * @throws {MergeError}
 */
export function merge(sources: object[], options?: MergeCallback | MergeOptions)
{
    return merger(options).of(...sources);
}