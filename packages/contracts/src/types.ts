/**
 * Primitive value
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values
 */
export type Primitive = null | undefined | boolean | number | bigint | string | symbol;

/**
 * Constructor type
 */
export type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;

/**
 * Constructor or Abstract Constructor type
 */
export type ConstructorOrAbstractConstructor<T = object> = Constructor<T> | AbstractConstructor<T>;