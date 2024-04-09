/**
 * Support identifier
 *
 * @type {Symbol}
 */
export const SUPPORT: unique symbol = Symbol('@aedart/support');

import ArbitraryData from "./ArbitraryData";
import CallbackWrapper from "./CallbackWrapper";
export {
    ArbitraryData,
    CallbackWrapper
}

export * from './isCallbackWrapper';