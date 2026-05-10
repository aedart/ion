import DummyLogger from './DummyLogger.js';

/**
 * Logs method call
 *
 * @param {(...args: unknown[]) => unknown} method
 * @param {ClassMethodDecoratorContext} context
 *
 * @returns {(this:object, ...methodArgs: unknown[]) => unknown}
 */
export function logMethodCall(
    method: (...args: unknown[]) => unknown,
    context: ClassMethodDecoratorContext,
)
{
    return function(this: object, ...methodArgs: unknown[])
    {
        DummyLogger.log('LOG: Invoking method', context);

        const result = method.call(this, ...methodArgs);

        DummyLogger.log('LOG: method was invoked');

        return result;
    };
}
