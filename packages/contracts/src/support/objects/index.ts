/**
 * Support Objects identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_OBJECTS: unique symbol = Symbol('@aedart/contracts/support/objects');

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

import MergeOptions from "./MergeOptions";
export {
    type MergeOptions
}

export * from './types';