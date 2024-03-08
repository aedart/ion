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