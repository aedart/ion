/**
 * Support Objects identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_OBJECTS: unique symbol = Symbol('@aedart/contracts/support/objects');

import Cloneable from "./Cloneable";
export {
    type Cloneable,
}

export * from './merge';
export * from './types';