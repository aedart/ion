/**
 * In-memory cache of previous tested functions
 */
const isConstructorCache: WeakMap<object, boolean> = new WeakMap<object, boolean>();

/**
 * Determine if given argument is a constructor
 *
 * @see https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
 * 
 * @param {unknown} argument
 * @param {boolean} [force=false] If set to false (_default_), then a cached result will be returned for
 *                                given argument (_if available_). If true, evt. cached result is ignored
 *                                and the argument is force tested if it's a constructor or not.
 * 
 * @return {boolean}
 */
export function isConstructor(argument: unknown, force: boolean = false): boolean
{
    // Source is heavily inspired by Denis Pushkarev's Core-js implementation of
    // Function.isCallable / Function.isConstructor, License MIT
    // @see https://github.com/zloirock/core-js#function-iscallable-isconstructor-
    
    if (typeof argument != 'function') {
        return false;
    }
    
    if (!force && isConstructorCache.has(argument)) {
        return isConstructorCache.get(argument);
    }
    
    try {
        // Attempt to construct a new function, using the argument as it's newTarget.
        // If the newTarget isn't a constructor, a TypeError will be thrown. The newTarget's
        // original constructor (if it has one) is not invoked, using this technique...  
        // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct#syntax
        // @see https://tc39.es/ecma262/multipage/reflection.html#sec-reflect.construct
        Reflect.construct(function() {}, [], argument);
        
        // If we reach this point, it means that the argument is a constructor. Result
        // is cached to reduce evt. retesting overhead when using try-catch / Reflect.construct.
        isConstructorCache.set(argument, true);
        return true;
    } catch (e) {
        // Regardless of the error cause, we assume that the argument is not a constructor...
        isConstructorCache.set(argument, false);
        return false;
    }
}