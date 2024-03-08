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
 * Callback that returns a resolved value
 */
export type FactoryCallback<
    T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (container: Container, ...args: any[]) => T; 