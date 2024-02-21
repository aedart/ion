/**
 * Default property keys to be skipped when merging objects
 *
 * @type {PropertyKey[]}
 */
export const DEFAULT_MERGE_SKIP_KEYS: PropertyKey[] = [ 'prototype', '__proto__' ];

/**
 * Default maximum merge depth
 *
 * @type {number}
 */
export const DEFAULT_MAX_MERGE_DEPTH: number = 512;

import MergeException from "./MergeException";
import MergeSourceInfo from "./MergeSourceInfo";
import MergeOptions from "./MergeOptions";
import ObjectsMerger from "./ObjectsMerger";
export {
    type MergeException,
    type MergeOptions,
    type MergeSourceInfo,
    type ObjectsMerger
}
