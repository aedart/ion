import MetaEntry from "./MetaEntry";
import MetaTargetContext from "./MetaTargetContext";
import Kind from "./Kind";

/**
 * Support Meta identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_META: unique symbol = Symbol('@aedart/contracts/support/meta');

/**
 * The well-known symbol for metadata
 * @see https://github.com/tc39/proposal-decorator-metadata
 * 
 * @type {symbol}
 */
export const METADATA: unique symbol = Symbol.for('metadata');

/**
 * Symbol used for "target" metadata
 * 
 * @type {symbol}
 */
export const TARGET_METADATA: unique symbol = Symbol('target_metadata');

export {
    type MetaEntry,
    type MetaTargetContext,
    
    Kind
};

export * from './exceptions/index';
export type * from './types';