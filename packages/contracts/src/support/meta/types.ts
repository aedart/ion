import ClassContext from "./ClassContext";
import MethodContext from "./MethodContext";
import GetterContext from "./GetterContext";
import SetterContext from "./SetterContext";
import FieldContext from "./FieldContext";
import AccessorContext from "./AccessorContext";
import MetaEntry from "./MetaEntry";

/**
 * Decorator context types for any decorator
 */
export type Context =
    | ClassContext
    | MemberContext
    ;

/**
 * Decorator context types for class element decorators
 */
export type MemberContext =
    | MethodContext
    | GetterContext
    | SetterContext
    | FieldContext
    | AccessorContext
    ;

/**
 * Callback that returns a meta entry object.
 */
export type MetaCallback = (target: object, context: Context) => MetaEntry;

/**
 * Metadata Record
 */
export type MetadataRecord = Record<string | number | symbol, unknown>;