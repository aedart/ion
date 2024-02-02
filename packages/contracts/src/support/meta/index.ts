import MetadataContext from "./MetadataContext";
import ClassContext from "./ClassContext";
import MethodContext from "./MethodContext";
import GetterContext from "./GetterContext";
import SetterContext from "./SetterContext";
import FieldContext from "./FieldContext";
import AccessorContext from "./AccessorContext";
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
    type ClassContext,
    type MethodContext,
    type GetterContext,
    type SetterContext,
    type FieldContext,
    type AccessorContext,
    type MetadataContext,
    
    type MetaEntry,
    type MetaTargetContext,
    
    Kind
};

export type * from './types';