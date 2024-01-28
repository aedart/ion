/**
 * Determine if given key is a valid property key name
 * 
 * @see {PropertyKey}
 * 
 * @param {any} key
 * 
 * @returns {boolean} True if typeof key is a string, number or symbol
 */
export function isPropertyKey(
    key: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    return [ 'string', 'number', 'symbol' ].includes(typeof key);
}