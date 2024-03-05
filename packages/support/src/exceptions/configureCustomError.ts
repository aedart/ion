import { configureStackTrace } from "./configureStackTrace";

/**
 * Configures the custom error
 *
 * **Note**: _Method sets the custom error's name and optionally captures a [stack trace]{@link configureStackTrace}
 * and sets it as the custom error's stack._
 * 
 * **Example**:
 * ```
 * class MyCustomError extends Error
 * {
 *      constructor(message, options)
 *      {
 *          super(message, options)
 *          
 *          configureCustomError(this);
 *      }
 * }
 * ```
 *
 * @template T extends Error
 *  
 * @param {Error} error
 * @param {boolean} [captureStackTrace=false]
 * 
 * @return {Error}
 */
export function configureCustomError<T extends Error>(error: T, captureStackTrace: boolean = false): T
{
    if (captureStackTrace) {
        configureStackTrace(error);    
    }

    error.name = Reflect.getPrototypeOf(error)?.constructor.name as string;
    
    return error;
}