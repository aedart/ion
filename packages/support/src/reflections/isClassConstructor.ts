/**
 * **WARNING**: _Method is currently unsafe to use! It is subject for breaking changes or possible removal._
 * 
 * Determine if given argument is a class constructor
 * 
 * @see https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
 * 
 * @param {unknown} argument
 * 
 * @return {boolean}
 */
export function isClassConstructor(argument: unknown): boolean
{
    // TODO: WARNING: Method is currently unsafe to use! It is subject for breaking changes or possible removal.
    
    // Source is heavily inspired by Denis Pushkarev's Core-js implementation of
    // Function.isCallable / Function.isConstructor, License MIT
    // @see https://github.com/zloirock/core-js#function-iscallable-isconstructor-
    
    if (typeof argument != 'function') {
        return false;
    }

    try {
        // Obtain a small part of the argument's string representation, to avoid
        // too large string from being processed by regex.
        const source: string = argument.toString().slice(0, 25);

        // Determine if source starts with "class".
        return new RegExp(/^\s*class\b/).test(source);
    } catch (e) {
        return false;
    }
}