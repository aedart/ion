/**
 * Contracts Support Meta identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_META: unique symbol = Symbol('@aedart/contracts/support/meta');

/**
 * The official Symbol used by the JS engine to store metadata on constructors.
 */
export const METADATA: unique symbol = Symbol.for('Symbol.metadata');

import Repository from "./Repository.js";
export {
    type Repository
}

export type * from './types.js';