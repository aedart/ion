import { Throwable } from '@aedart/contracts/support/exceptions';

/**
 * Check if an error is of a specific exception type
 * 
 * @template T
 * 
 * @param error
 * @param {T["name"]} name
 * 
 * @returns {error is T}
 */
export function isException<T extends Throwable>(
    error: unknown,
    name: T['name']
): error is T
{
    return (
        error !== null &&
        typeof error === 'object' &&
        'name' in error &&
        (error as Throwable).name === name
    );
}
