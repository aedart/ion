/**
 * Constructor type
 */
export type Constructor<T = unknown> = new(...args: any[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T = unknown> = abstract new(...args: any[]) => T;

/**
 * Constructor Like
 *
 * In this context, a "constructor like" type is either a class constructor,
 * or an abstract class constructor.
 */
export type ConstructorLike<T = unknown> = Constructor<T> | AbstractConstructor<T>;
