import type { ObjectsMerger } from "@aedart/contracts/support/objects";
import Merger from "./merge/Merger";

/**
 * Returns a new Object Merger instance
 * 
 * @return {ObjectsMerger}
 */
export function merge(): ObjectsMerger;

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 *
 * @template SourceA extends object
 *
 * @param {SourceA} a
 *
 * @returns {SourceA}
 *
 * @throws {MergeError}
 */
export function merge<
    SourceA extends object
>(a: SourceA): SourceA;

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 *
 * @template SourceA extends object
 * @template SourceB extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 *
 * @returns {SourceA & SourceB}
 *
 * @throws {MergeError}
 */
export function merge<
    SourceA extends object,
    SourceB extends object,
>(a: SourceA, b: SourceB): SourceA & SourceB;

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 *
 * @returns {SourceA & SourceB & SourceC}
 *
 * @throws {MergeError}
 */
export function merge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
>(a: SourceA, b: SourceB, c: SourceC): SourceA & SourceB & SourceC;

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 * @template SourceD extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 *
 * @returns {SourceA & SourceB & SourceC & SourceD}
 *
 * @throws {MergeError}
 */
export function merge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
    SourceD extends object,
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD): SourceA & SourceB & SourceC & SourceD;

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 * @template SourceD extends object
 * @template SourceE extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 * @param {SourceE} e
 *
 * @returns {SourceA & SourceB & SourceC & SourceD & SourceE}
 *
 * @throws {MergeError}
 */
export function merge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
    SourceD extends object,
    SourceE extends object,
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE): SourceA & SourceB & SourceC & SourceD & SourceE;

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 * @template SourceD extends object
 * @template SourceE extends object
 * @template SourceF extends object
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
 * @throws {MergeError}
 */
export function merge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
    SourceD extends object,
    SourceE extends object,
    SourceF extends object,
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE, f: SourceF): SourceA & SourceB & SourceC & SourceD & SourceE & SourceF;

/**
 * Returns a merger of given source objects
 *
 * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
 * of all given sources._
 * 
 * @param {....object} [sources]
 * 
 * @return {ObjectsMerger|object}
 * 
 * @throws {MergeError} 
 */
export function merge(...sources: object[])
{
    const merger: ObjectsMerger = new Merger();
    
    if (sources.length == 0) {
        return merger;
    }
    
    return merger.of(...sources);
}