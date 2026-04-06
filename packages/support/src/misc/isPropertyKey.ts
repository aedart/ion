/**
 * Determine if given key is a valid property key name
 *
 * @see {PropertyKey}
 *
 * @param {any} key
 *
 * @returns {boolean} True if typeof key is a string, number or symbol
 */
export function isPropertyKey(key: any): boolean
{
    const type = typeof key;

    return type === 'string' || type === 'number' || type === 'symbol';
}
