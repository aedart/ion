import { isClassConstructor } from "./isClassConstructor";

/**
 * **WARNING**: _Method is currently unsafe to use! It is subject for breaking changes or possible removal._
 * 
 * Determine if given argument is callable, but is not a class constructor
 *
 * @see {isClassConstructor}
 * @see https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
 * 
 * @param {unknown} argument
 * 
 * @return {boolean}
 */
export function isCallable(argument: unknown): boolean
{
    // TODO: WARNING: Method is currently unsafe to use! It is subject for breaking changes or possible removal.
    
    // Source is heavily inspired by Denis Pushkarev's Core-js implementation of
    // Function.isCallable / Function.isConstructor, License MIT
    // @see https://github.com/zloirock/core-js#function-iscallable-isconstructor-

    return typeof argument == 'function' && !isClassConstructor(argument);
}