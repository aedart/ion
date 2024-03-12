import Container from "./Container";

/**
 * Binding Identifier
 * 
 * A unique identifier used for associating "concrete" items or values in
 * a service container.
 */
export type Identifier = string | symbol | number | NonNullable<object>;

/**
 * Binding Alias
 * 
 * @see Identifier
 */
export type Alias = Identifier;

/**
 * Factory Callback
 * 
 * The callback is responsible for resolving a value, when a binding
 * is resolved in a service container.
 */
export type FactoryCallback<
    Value = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (container: Container, ...args: any[]) => Value;

/**
 * Extend Callback
 * 
 * Callback can be used to "extend", decorate or modify a resolved value
 * from the service container.
 */
export type ExtendCallback<
    Value = any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ExtendedValue extends Value = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (resolved: Value, container: Container) => ExtendedValue;

/**
 * Before Resolved Callback
 * 
 * Callback to be invoked before a binding is resolved.
 */
export type BeforeResolvedCallback = (identifier: Identifier, args: any[], container: Container) => void;

/**
 * After Resolved Callback
 * 
 * Callback to be invoked after a binding has been resolved.
 */
export type AfterResolvedCallback<
    Value = any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (identifier: Identifier, resolved: Value, container: Container) => void;