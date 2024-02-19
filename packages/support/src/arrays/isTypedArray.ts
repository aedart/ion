import { TYPED_ARRAY_PROTOTYPE } from "@aedart/contracts/support/reflections";

/**
 * Determine if given target is an instance of a `TypedArray`
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
 * 
 * @param {object} target
 * 
 * @return {boolean}
 */
export function isTypedArray(target: object): boolean
{
    return target instanceof TYPED_ARRAY_PROTOTYPE;
}