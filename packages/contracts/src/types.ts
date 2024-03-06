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
 * Class Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassDecorator = (target: object, context: ClassDecoratorContext) => object | void;

/**
 * Class Method Decorator
 *
 * @see https://github.com/tc39/proposal-decorators 
 */
export type ClassMethodDecorator = (target: object, context: ClassMethodDecoratorContext) => object | void;

/**
 * Class Getter Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassGetterDecorator = (target: object, context: ClassGetterDecoratorContext) => object | void;

/**
 * Class Setter Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassSetterDecorator = (target: object, context: ClassSetterDecoratorContext) => object | void;

/**
 * Class Field Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassFieldDecorator = (target: object, context: ClassFieldDecoratorContext) => (initialValue: unknown) => unknown | void;

/**
 * Class Auto-Accessor Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassAutoAccessorDecorator = (target: ClassAccessorDecoratorTarget<object, unknown>, context: ClassAccessorDecoratorContext) => ClassAccessorDecoratorResult<object, unknown> | void

/**
 * Decorator
 * 
 * @see https://github.com/tc39/proposal-decorators
 */
export type Decorator = ClassDecorator
    | ClassMethodDecorator
    | ClassGetterDecorator
    | ClassSetterDecorator
    | ClassFieldDecorator
    | ClassAutoAccessorDecorator;