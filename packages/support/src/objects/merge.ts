import type { MergeCallback, MergeOptions, ObjectsMerger } from '@aedart/contracts/support/objects';
import Merger from './merge/Merger.js';

/**
 * Returns a new Objects Merger instance
 *
 * @returns {ObjectsMerger}
 */
export function merge(): ObjectsMerger;

/**
 * Returns a new Objects Merger using the following options or callback
 *
 * @param {MergeCallback | MergeOptions} options
 *
 * @returns {ObjectsMerger}
 */
export function merge(options: MergeCallback | MergeOptions): ObjectsMerger;

/**
 * Returns a merger of given source objects
 *
 * @template SourceA extends object
 *
 * @param {SourceA} a
 *
 * @returns {SourceA}
 */
export function merge<SourceA extends object>(a: SourceA): SourceA;

/**
 * Returns a merger of given source objects
 *
 * @template SourceA extends object
 * @template SourceB extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 *
 * @returns {SourceA & SourceB}
 */
export function merge<SourceA extends object, SourceB extends object>(
    a: SourceA,
    b: SourceB,
): SourceA & SourceB;

/**
 * Returns a merger of given source objects
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
 */
export function merge<SourceA extends object, SourceB extends object, SourceC extends object>(
    a: SourceA,
    b: SourceB,
    c: SourceC,
): SourceA & SourceB & SourceC;

/**
 * Returns a merger of given source objects
 *
 * @param {object} a
 * @param {object} b
 * @param {...object} sources
 *
 * @returns {object}
 */
export function merge(a: object, b: object, ...sources: object[]): object;

/**
 * Returns a new Objects Merger instance or merges given sources
 *
 * @param {object | MergeCallback | MergeOptions} [a]
 * @param {object} [b]
 * @param {...object} [sources]
 *
 * @returns {ObjectsMerger | object}
 */
export function merge(
    a?: object | MergeCallback | MergeOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    b?: object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...sources: object[]
): ObjectsMerger | object
{
    // Factory call: merge()
    if (arguments.length === 0) {
        return new Merger();
    }

    // Configuration call: merge(options)
    // Note: We detect options if 'a' is a function or an object that isn't a plain "data" object.
    if (
        arguments.length === 1
        && (typeof a === 'function'
            || (typeof a === 'object' && a !== null && !Reflect.has(a, 'constructor')))
    ) {
        return new Merger(a as MergeCallback | MergeOptions);
    }

    // Direct merge call: merge(a, b, ...sources)
    // eslint-disable-next-line prefer-rest-params
    return (new Merger()).of(...(arguments as unknown as object[]));
}
