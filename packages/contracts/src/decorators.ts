/**
 * Class Decorator Result
 */
export type ClassDecoratorResult = object | void;

/**
 * Class Method Decorator Result
 */
export type ClassMethodDecoratorResult = object | void;

/**
 * Class Getter Decorator Result
 */
export type ClassGetterDecoratorResult = object | void;

/**
 * Class Setter Decorator Result
 */
export type ClassSetterDecoratorResult = object | void;

/**
 * Class Field Decorator Result
 */
export type ClassFieldDecoratorResult = (initialValue: unknown) => unknown | void;

/**
 * Class Auto-Accessor Decorator Result
 */
export type ClassAutoAccessorDecoratorResult = ClassAccessorDecoratorResult<object, unknown> | void

/**
 * Decorator Result
 */
export type DecoratorResult = ClassDecoratorResult
    | ClassMethodDecoratorResult
    | ClassGetterDecoratorResult
    | ClassSetterDecoratorResult
    | ClassFieldDecoratorResult
    | ClassAutoAccessorDecoratorResult;

/**
 * Class Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassDecorator = (target: object, context: ClassDecoratorContext) => ClassDecoratorResult;

/**
 * Class Method Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassMethodDecorator = (target: object, context: ClassMethodDecoratorContext) => ClassMethodDecoratorResult;

/**
 * Class Getter Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassGetterDecorator = (target: object, context: ClassGetterDecoratorContext) => ClassGetterDecoratorResult;

/**
 * Class Setter Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassSetterDecorator = (target: object, context: ClassSetterDecoratorContext) => ClassSetterDecoratorResult;

/**
 * Class Field Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassFieldDecorator = (target: object, context: ClassFieldDecoratorContext) => ClassFieldDecoratorResult;

/**
 * Class Auto-Accessor Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassAutoAccessorDecorator = (target: ClassAccessorDecoratorTarget<object, unknown>, context: ClassAccessorDecoratorContext) => ClassAutoAccessorDecoratorResult;

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