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
export const FUNCTION_PROTOTYPE: object = Reflect.getPrototypeOf(Function);
