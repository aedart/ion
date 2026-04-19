import DummyLogger from "./DummyLogger.js";

/**
 * Logs method call
 *
 * @param method
 * @param context
 *
 * @returns {(this:any, ...args: any[]) => any}
 */
export function logMethodCall(method: any, context: ClassMethodDecoratorContext)
{
    return function(this: any, ...args: any[]) {
        DummyLogger.log('LOG: Invoking method', context);

        let result = method.call(this, ...args);

        DummyLogger.log('LOG: method was invoked');

        return result;
    }
}
