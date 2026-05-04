import { isBoundFunction } from './isBoundFunction.js';

/**
 * Cached references to avoid repeated lookups and allocations.
 */
const { construct: reflectConstruct } = Reflect;
const DUMMY_ARGS: never[] = [];
const DUMMY_CONSTRUCTOR = function () {};

/**
 * Determine if a given argument is a constructor.
 *
 * @param {unknown} argument - The value to check.
 *
 * @returns {boolean} `true` if the argument is a constructor, `false` otherwise.
 */
export function isConstructor(argument: unknown): boolean
{
    if (typeof argument !== 'function') {
        return false;
    }

    // Fast path: arrow functions lack prototypes and aren't bound.
    // This avoids the expensive try/catch for most non-constructors.
    if (!(argument as { prototype?: unknown }).prototype && !isBoundFunction(argument)) {
        return false;
    }

    try {
        reflectConstruct(DUMMY_CONSTRUCTOR, DUMMY_ARGS, argument as new (...args: unknown[]) => unknown);
        return true;
    } catch {
        return false;
    }
}