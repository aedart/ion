export * from './decorators';

/**
 * Primitive value
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values
 */
export type Primitive = null | undefined | boolean | number | bigint | string | symbol;

/**
 * Callback type
 */
export type Callback = (...args: any[]) => any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

/**
 * Constructor type
 */
export type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;

/**
 * @deprecated Since version 0.11 - Use {@link ConstructorLike} instead
 * 
 * Constructor or Abstract Constructor type
 */
export type ConstructorOrAbstractConstructor<T = object> = Constructor<T> | AbstractConstructor<T>;

/**
 * Constructor Like
 * 
 * In this context, a "constructor like" type is either a class constructor,
 * or an abstract class constructor.
 */
export type ConstructorLike<T = object> = Constructor<T> | AbstractConstructor<T>;

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

/**
 * @deprecated TODO: Remove this ...
 * 
 * A [module-name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#modulename) to
 * be imported. This is often a relative or absolute URL to *.js file that contains the module itself.
 */
export type ModuleName = string;