/**
 * Support identifier
 *
 * @type {Symbol}
 */
export const SUPPORT: unique symbol = Symbol('@aedart/contracts/support');

import Arrayable from "./Arrayable";
import CallbackWrapper from "./CallbackWrapper";
export {
    type Arrayable,
    type CallbackWrapper
}

export type * from './types';