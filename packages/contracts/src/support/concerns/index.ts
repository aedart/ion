import Concern from "./Concern";
import Configuration from "./Configuration";

/**
 * Support Concerns identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_CONCERNS: unique symbol = Symbol('@aedart/contracts/support/concerns');

/**
 * Symbol used by a {@link Concern} to define properties or methods that must be
 * "hidden" and not allowed to be aliased into a target class.
 * 
 * @type {Symbol}
 */
export const HIDDEN: unique symbol = Symbol('hidden');

export {
    type Concern,
    type Configuration
}

export * from './types';