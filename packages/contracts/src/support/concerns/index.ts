import Concern from "./Concern";
import Configuration from "./Configuration";

/**
 * Support Concerns identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_CONCERNS: unique symbol = Symbol('@aedart/contracts/support/concerns');

export {
    type Concern,
    type Configuration
}

export * from './types';