/**
 * Support Reflections identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_REFLECTIONS: unique symbol = Symbol('@aedart/contracts/support/reflections');

/**
 * The prototype of {@link Function}
 * 
 * **Note**: _Prototype is obtained via `Reflect.getPrototypeOf(Function)`_
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype
 * 
 * @type {object}
 */
export const FUNCTION_PROTOTYPE: object = Reflect.getPrototypeOf(Function) as object;

/**
 * `TypedArray` prototype
 *
 * **Note**: _Prototype is obtained via `Reflect.getPrototypeOf(Int8Array)`_
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
 * 
 * @type {object}
 */
export const TYPED_ARRAY_PROTOTYPE: object = Reflect.getPrototypeOf(Int8Array) as object;

import ClassBlueprint from "./ClassBlueprint";
export {
    type ClassBlueprint
}
