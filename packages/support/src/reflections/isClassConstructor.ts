/**
 * Determine if given value is a class constructor (es6)
 * 
 * @see https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
 * 
 * @param {unknown} value
 * 
 * @return {boolean}
 */
export function isClassConstructor(value: unknown): boolean
{
    // Source is heavily inspired by Denis Pushkarev's Core-js implementation of
    // Function.isCallable / Function.isConstructor, License MIT
    // @see https://github.com/zloirock/core-js#function-iscallable-isconstructor-
    
    if (typeof value != 'function') {
        return false;
    }

    try {
        // Obtain a small part of the argument's string representation, to avoid
        // too large string from being processed by regex.
        const source: string = value.toString().slice(0, 25);

        // Determine if source starts with "class".
        return new RegExp(/^\s*class\b/).test(source);
    } catch (e) {
        return false;
    }
}