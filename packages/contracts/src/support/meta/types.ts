import ClassContext from "./ClassContext";
import MethodContext from "./MethodContext";
import GetterContext from "./GetterContext";
import SetterContext from "./SetterContext";
import FieldContext from "./FieldContext";
import AccessorContext from "./AccessorContext";

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