/**
 * Constructor type
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T = any> = new(...args: any[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T = any> = abstract new(...args: any[]) => T;

/**
 * Constructor Like
 *
 * In this context, a "constructor like" type is either a class constructor,
 * or an abstract class constructor.
 */
export type ConstructorLike<T = any> = Constructor<T> | AbstractConstructor<T>;
/* eslint-enable @typescript-eslint/no-explicit-any */
