/**
 * Returns error message from {@link Error}, if possible
 *
 * @param {unknown} error Error or value that was thrown
 * @param {string} [defaultMessage] A default message to return if unable to resolve error message
 *
 * @return {string}
 */
export function getErrorMessage(error: unknown, defaultMessage: string = 'unknown reason'): string
{
    return (typeof error == 'object' && Reflect.has(error, 'message'))
        ? error.message
        : defaultMessage;
}