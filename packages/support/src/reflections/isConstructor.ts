import { isBoundFunction } from './isBoundFunction.js';

/**
 * Cached references to avoid repeated lookups and allocations.
 */
const { construct: reflectConstruct } = Reflect;
const DUMMY_ARGS: any[] = [];
const DUMMY_CONSTRUCTOR = function()
{};

/**
 * Determine if given argument is a constructor.
 *
 * @param {unknown} argument The value to check.
 *
 * @returns {boolean}
 */
export function isConstructor(argument: unknown): boolean
{
    if (typeof argument !== 'function') {
        return false;
    }

    // Fast Path: Arrow fns lack prototypes and aren't bound.
    // This avoids the expensive try/catch for most non-constructors.
    if (!(argument as Function).prototype && !isBoundFunction(argument)) {
        return false;
    }

    try {
        reflectConstruct(DUMMY_CONSTRUCTOR, DUMMY_ARGS, argument as Function);
        return true;
    } catch {
        return false;
    }
}
