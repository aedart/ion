import type { ArrayMerger as ArrayMergerContract } from "@aedart/contracts/support/arrays";
import ArrayMerger from "./merge/ArrayMerger";

/**
 * Returns new Array Merger instance
 * 
 * @return {ArrayMerger}
 */
export function merge(): ArrayMergerContract;

/**
 * Returns a merger of given source arrays
 *
 * @template SourceA extends any[]
 *
 * @param {SourceA} a
 *
 * @returns {SourceA}
 *
 * @throws {ArrayMergeException}
 */
export function merge<
    SourceA extends any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
>(a: SourceA): SourceA;

/**
 * Returns a merger of given source arrays
 *
 * @template SourceA extends any[]
 * @template SourceB extends any[]
 *
 * @param {SourceA} a
 * @param {SourceB} b
 *
 * @returns {SourceA & SourceB}
 *
 * @throws {ArrayMergeException}
 */
export function merge<
    SourceA extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceB extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
>(a: SourceA, b: SourceB): SourceA & SourceB;

/**
 * Returns a merger of given source arrays
 *
 * @template SourceA extends any[]
 * @template SourceB extends any[]
 * @template SourceC extends any[]
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 *
 * @returns {SourceA & SourceB & SourceC}
 *
 * @throws {ArrayMergeException}
 */
export function merge<
    SourceA extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceB extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceC extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
>(a: SourceA, b: SourceB, c: SourceC): SourceA & SourceB & SourceC;

/**
 * Returns a merger of given source arrays
 *
 * @template SourceA extends any[]
 * @template SourceB extends any[]
 * @template SourceC extends any[]
 * @template SourceD extends any[]
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 *
 * @returns {SourceA & SourceB & SourceC & SourceD}
 *
 * @throws {ArrayMergeException}
 */
export function merge<
    SourceA extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceB extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceC extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceD extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD): SourceA & SourceB & SourceC & SourceD;

/**
 * Returns a merger of given source arrays
 *
 * @template SourceA extends any[]
 * @template SourceB extends any[]
 * @template SourceC extends any[]
 * @template SourceD extends any[]
 * @template SourceE extends any[]
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 * @param {SourceE} e
 *
 * @returns {SourceA & SourceB & SourceC & SourceD & SourceE}
 *
 * @throws {ArrayMergeException}
 */
export function merge<
    SourceA extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceB extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceC extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceD extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceE extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE): SourceA & SourceB & SourceC & SourceD & SourceE;

/**
 * Returns a merger of given source arrays
 *
 * @template SourceA extends any[]
 * @template SourceB extends any[]
 * @template SourceC extends any[]
 * @template SourceD extends any[]
 * @template SourceE extends any[]
 * @template SourceF extends any[]
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 * @param {SourceE} e
 * @param {SourceF} f
 *
 * @returns {SourceA & SourceB & SourceC & SourceD & SourceE & SourceF}
 *
 * @throws {ArrayMergeException}
 */
export function merge<
    SourceA extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceB extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceC extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceD extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceE extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    SourceF extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE, f: SourceF): SourceA & SourceB & SourceC & SourceD & SourceE & SourceF;

/**
 * Merge two or more arrays
 *
 * **Note**: _Method attempts to deep copy array values, via [structuredClone]{@link https://developer.mozilla.org/en-US/docs/Web/API/structuredClone}_
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
 * 
 * @param {...any[]} sources
 *
 * @return {ArrayMerger|any[]}
 *
 * @throws {ArrayMergeError} If unable to merge arrays, e.g. if a value cannot be cloned via `structuredClone()`
 */
export function merge(
    ...sources: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
)
{
    const merger = new ArrayMerger();
    
    if (sources.length == 0) {
        return merger as ArrayMergerContract;
    }
    
    return merger.of(...sources);
}