/**
 * Determine if given value is a {@link Promise}
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * 
 * @param {any} value
 * 
 * @returns {boolean}
 */
export function isPromise(
    value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    return !!value && typeof value.then === 'function';
}