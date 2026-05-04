/**
 * Contracts Support Reflections identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_REFLECTIONS: unique symbol = Symbol('@aedart/contracts/support/reflections');

/**
 * `TypedArray` instance prototype
 *
 * **Note**: _Prototype is obtained via `Reflect.getPrototypeOf(Int8Array.prototype)`_
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
 */
export const TYPED_ARRAY_PROTOTYPE: object = Reflect.getPrototypeOf(Int8Array.prototype)!;

import ClassBlueprint from './ClassBlueprint.js';
export { type ClassBlueprint };
