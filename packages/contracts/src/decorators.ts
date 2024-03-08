/**
 * Class Decorator Result
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassDecoratorResult<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = T | void;

/**
 * Class Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassDecorator<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = (target: T, context: ClassDecoratorContext) => ClassDecoratorResult<T>;

/**
 * Class Method Decorator Result
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassMethodDecoratorResult<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = T | void;

/**
 * Class Method Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassMethodDecorator<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = (target: T, context: ClassMethodDecoratorContext) => ClassMethodDecoratorResult<T>;

/**
 * Class Getter Decorator Result
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassGetterDecoratorResult<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = T | void;

/**
 * Class Getter Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassGetterDecorator<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = (target: T, context: ClassGetterDecoratorContext) => ClassGetterDecoratorResult<T>;

/**
 * Class Setter Decorator Result
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassSetterDecoratorResult<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = T | void;

/**
 * Class Setter Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassSetterDecorator<
    T extends Function = any /* eslint-disable-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
> = (target: T, context: ClassSetterDecoratorContext) => ClassSetterDecoratorResult<T>;

/**
 * Class Field Decorator Result
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassFieldDecoratorResult<
    Value = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (initialValue: Value) => Value | void;

/**
 * Class Field Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassFieldDecorator<
    Value = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (value: undefined, context: ClassFieldDecoratorContext) => ClassFieldDecoratorResult<Value>;

/**
 * Class Auto-Accessor Decorator Result
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassAutoAccessorDecoratorResult<
    This extends object = object,
    Value = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = ClassAccessorDecoratorResult<This, Value> | void

/**
 * Class Auto-Accessor Decorator
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type ClassAutoAccessorDecorator<
    This extends object = object,
    Value = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (value: ClassAccessorDecoratorTarget<This, Value>, context: ClassAccessorDecoratorContext) => ClassAutoAccessorDecoratorResult<This, Value>;

/**
 * Decorator Result
 *
 * @see https://github.com/tc39/proposal-decorators
 */
export type DecoratorResult = ClassDecoratorResult
    | ClassMethodDecoratorResult
    | ClassGetterDecoratorResult
    | ClassSetterDecoratorResult
    | ClassFieldDecoratorResult
    | ClassAutoAccessorDecoratorResult;

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