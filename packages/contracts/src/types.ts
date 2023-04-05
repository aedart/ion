/**
 * Constructor type
 */
export type Constructor<T> = new (...args: any[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T> = abstract new (...args: any[]) => T;

/**
 * Constructor or Abstract Constructor type
 */
export type ConstructorOrAbstractConstructor<T> = Constructor<T> | AbstractConstructor<T>;

/**
 * TODO: This should perhaps belong elsewhere...
 * 
 * Object property key
 */
export type PropertyKey = string | number | symbol;