import { Callback, ConstructorLike, Constructor } from "@aedart/contracts";
import Container from "./Container";

/**
 * Binding Identifier
 * 
 * A unique identifier used for associating "concrete" items or values in
 * a service container.
 */
export type Identifier = string | symbol | number | NonNullable<object> | ConstructorLike | Callback;

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
 * Rebound Callback
 * 
 * Callback to be invoked when a binding is "rebound".
 */
export type ReboundCallback<
    Value = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (resolved: Value, container: Container) => void;

/**
 * Before Resolved Callback
 * 
 * Callback to be invoked before a binding is resolved.
 */
export type BeforeResolvedCallback = (
    identifier: Identifier,
    args: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    container: Container
) => void;

/**
 * After Resolved Callback
 * 
 * Callback to be invoked after a binding has been resolved.
 */
export type AfterResolvedCallback<
    Value = any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (
    identifier: Identifier,
    resolved: Value,
    container: Container
) => void;

/**
 * Binding Tuple
 * 
 * An array that contains binding identifier, factory callback / constructor, and shared state.
 * 
 * @see Binding
 */
export type BindingTuple<
    T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = [
    Identifier,
    FactoryCallback<T> | Constructor<T>,
    boolean? // Shared state
];

/**
 * Identifier / Instance Tuple
 * 
 * An array that contains binding identifier for an existing object instance.
 */
export type IdentifierInstanceTuple<
    T = object
> = [
    Identifier,
    T
];

/**
 * Identifier / Alias Tuple
 * 
 * An array that contains binding identifier and an alias for that identifier.
 */
export type IdentifierAliasTuple = [
    Identifier,
    Alias
];
