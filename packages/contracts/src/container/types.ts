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