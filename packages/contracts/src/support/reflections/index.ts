import Reflection from "./Reflection";

/**
 * Support Reflections identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_REFLECTIONS: unique symbol = Symbol('@aedart/contracts/support/reflections');

/**
 * @deprecated TODO: This component must be redesigned or removed entirely...
 * 
 * Reflections identifier in metadata
 * 
 * @type {symbol}
 */
export const META_REFLECTIONS: unique symbol = Symbol('reflections');

export {
    type Reflection
}