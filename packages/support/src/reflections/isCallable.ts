import { isClassConstructor } from "./isClassConstructor";

/**
 * Determine if given argument is callable, but is not a class constructor (es6 style)
 *
 * @see {isClassConstructor}
 * @see https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
 * 
 * @param {unknown} value
 * 
 * @return {boolean}
 */
export function isCallable(value: unknown): boolean
{
    // Source is heavily inspired by Denis Pushkarev's Core-js implementation of
    // Function.isCallable / Function.isConstructor, License MIT
    // @see https://github.com/zloirock/core-js#function-iscallable-isconstructor-

    return typeof value == 'function' && !isClassConstructor(value);
}