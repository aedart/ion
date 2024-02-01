/**
 * Determine if given argument is a constructor
 *
 * @see https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
 * 
 * @param {unknown} argument
 * 
 * @return {boolean}
 */
export function isConstructor(argument: unknown): boolean
{
    // Source is heavily inspired by Denis Pushkarev's Core-js implementation of
    // Function.isCallable / Function.isConstructor, License MIT
    // @see https://github.com/zloirock/core-js#function-iscallable-isconstructor-
    
    if (typeof argument != 'function') {
        return false;
    }

    try {
        // Attempt to construct a new function, using the argument as it's newTarget.
        // If the newTarget isn't a constructor, a TypeError will be thrown. The newTarget's
        // original constructor (if it has one) is not invoked, using this technique...  
        // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct#syntax
        // @see https://tc39.es/ecma262/multipage/reflection.html#sec-reflect.construct
        Reflect.construct(function() {}, [], argument);
        
        // If we reach this point, it means that the argument is a constructor.
        return true;
    } catch (e) {
        // Regardless of the error cause, we assume that the argument is not a constructor...
        return false;
    }
}