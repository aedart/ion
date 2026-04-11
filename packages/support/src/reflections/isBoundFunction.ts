/**
 * Determine if a function is a bound function.
 *
 * @param {unknown} argument The value to check.
 * 
 * @returns {boolean}
 */
export function isBoundFunction(argument: unknown): boolean
{
    return (
        typeof argument === 'function' &&
        typeof argument.name === 'string' &&
        argument.name.startsWith('bound ')
    );
}
