/**
 * Returns error message from {@link Error}, if possible
 *
 * @param {any} error Error or value that was thrown
 * @param {string} [defaultMessage] A default message to return if unable to resolve error message
 *
 * @return {string}
 */
export function getErrorMessage(
    error: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    defaultMessage: string = 'unknown reason'
): string
{
    return (typeof error == 'object' && error instanceof Error && Reflect.has(error, 'message'))
        ? error.message
        : defaultMessage;
}