import ArrayMergeOptions from "./ArrayMergeOptions";
import { ArrayMergeCallback } from "./types";

/**
 * Array Merger
 *
 * Able to merge (deep merge) multiple source arrays into a single new array.
 */
export default interface ArrayMerger
{
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
     * @template SourceA extends any[]
     *
     * @param {SourceA} a
     *
     * @returns {SourceA}
     *
     * @throws {ArrayMergeException}
     */
    of<
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
    of<
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
    of<
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
    of<
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
    of<
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
    of<
        SourceA extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        SourceB extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        SourceC extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        SourceD extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        SourceE extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        SourceF extends any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE, f: SourceF): SourceA & SourceB & SourceC & SourceD & SourceE & SourceF;
    
    /**
     * Returns a merger of given source arrays
     * 
     * @param {...any[]} sources
     * 
     * @return {any[]}
     * 
     * @throws {ArrayMergeException}
     */
    of(...sources: any[]): any[]; /* eslint-disable-line @typescript-eslint/no-explicit-any */
}