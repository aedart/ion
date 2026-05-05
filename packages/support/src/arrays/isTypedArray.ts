import { TYPED_ARRAY_PROTOTYPE } from '@aedart/contracts/support/reflections';

/**
 * Determine if given target is an instance of a `TypedArray`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
 *
 * @param {unknown} target
 *
 * @return {boolean}
 */
export function isTypedArray(target: unknown): boolean
{
    // Fast-exit for null or non-objects
    if (target === null || target === undefined || typeof target !== 'object') {
        return false;
    }

    // Use isPrototypeOf because TYPED_ARRAY_PROTOTYPE is the prototype object,
    // not the constructor function.
    return Object.prototype.isPrototypeOf.call(TYPED_ARRAY_PROTOTYPE, target);
}
