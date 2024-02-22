import {isset} from "@aedart/support/misc";

/**
 * Captures stack trace and sets stack trace for given error
 * 
 * **Caution**: _Method will mutate given `error` by setting the `stack` property_
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
 * 
 * @param {Error} error
 * 
 * @return {string|undefined} Captured stack trace
 */
export function configureStackTrace(error: Error): string | undefined
{
    if (!isset(error)){
        return undefined;
    }
    
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
    if (Reflect.has(Error, 'captureStackTrace') && typeof Error['captureStackTrace'] == 'function') {
        (Error.captureStackTrace as (err: Error, errorConstructor: ErrorConstructor) => void)(error, Reflect.getPrototypeOf(error) as ErrorConstructor);
    } else {
        error.stack = (new Error()).stack;
    }
    
    return error.stack;
}