import Registry, { REGISTRY } from "./Registry";
import MetadataContext from "./MetadataContext";
import ClassContext from "./ClassContext";
import MethodContext from "./MethodContext";
import GetterContext from "./GetterContext";
import SetterContext from "./SetterContext";
import FieldContext from "./FieldContext";
import AccessorContext from "./AccessorContext";
import MetaEntry from "./MetaEntry";

/**
 * Support Meta identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_META: unique symbol = Symbol('@aedart/contracts/support/meta');

//export type * from './types';
export {
    type Registry,
    REGISTRY,
    
    type ClassContext,
    type MethodContext,
    type GetterContext,
    type SetterContext,
    type FieldContext,
    type AccessorContext,
    type MetadataContext,
    
    type MetaEntry,
};

export type * from './types';