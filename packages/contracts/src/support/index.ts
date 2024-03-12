/**
 * Support identifier
 *
 * @type {Symbol}
 */
export const SUPPORT: unique symbol = Symbol('@aedart/contracts/support');

import Arrayable from "./Arrayable";
import CallbackWrapper from "./CallbackWrapper";
import HasArbitraryData from "./HasArbitraryData";
export {
    type Arrayable,
    type CallbackWrapper,
    type HasArbitraryData
}

export type * from './types';