export * from './decorators';

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

/**
 * Class method name
 */
export type ClassMethodName<T = object> = {
    [Name in keyof T]: T[Name] extends Function /* eslint-disable-line @typescript-eslint/ban-types */
        ? Name
        : never;
}[keyof T];

/**
 * Class Method Reference
 * 
 * Array that contains either a class constructor or class instance, and the method name
 * that must be processed at some point. E.g. the method to be invoked.
 */
export type ClassMethodReference<T = object> = [ Constructor<T> | T, ClassMethodName<T> ];