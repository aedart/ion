import { configureStackTrace } from "./configureStackTrace";

/**
 * Configures the custom error
 * 
 * **Note**: _Method configures error by setting its [stack trace]{@link configureStackTrace}
 * and setting the error's common properties, e.g. name_
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
 * 
 * @return {Error}
 */
export function configureCustomError<T extends Error>(error: T): T
{
    configureStackTrace(error);

    error.name = Reflect.getPrototypeOf(error)?.constructor.name as string;
    
    return error;
}