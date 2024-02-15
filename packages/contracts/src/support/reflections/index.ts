/**
 * Support Reflections identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_REFLECTIONS: unique symbol = Symbol('@aedart/contracts/support/reflections');

/**
 * The prototype of {@link Function}
 * 
 * @type {object}
 */
export const FUNCTION_PROTOTYPE: object = Reflect.getPrototypeOf(Function);
