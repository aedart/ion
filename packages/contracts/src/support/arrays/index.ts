/**
 * Contracts Support Arrays identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_ARRAYS: unique symbol = Symbol('@aedart/contracts/support/arrays');

import ConcatSpreadable from "./ConcatSpreadable.js";
export {
    type ConcatSpreadable
}

export * from './merge/index.js'