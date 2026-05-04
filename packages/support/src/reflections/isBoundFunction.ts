/**
 * Determine if a function is a bound function.
 *
 * @param {unknown} argument - The value to check.
 *
 * @returns {boolean} `true` if the argument is a bound function, `false` otherwise.
 */
export function isBoundFunction(argument: unknown): boolean
{
    return (
        typeof argument === 'function'
        && typeof argument.name === 'string'
        && argument.name.startsWith('bound ')
    );
}