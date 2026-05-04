/**
 * Determine if a given key is a valid property key.
 *
 * @see {@link PropertyKey}
 *
 * @param {unknown} key - The value to check.
 *
 * @returns {key is PropertyKey} `true` if the key is a `string`, `number`, or `symbol`.
 */
export function isPropertyKey(key: unknown): key is PropertyKey
{
    const type = typeof key;
    return type === 'string' || type === 'number' || type === 'symbol';
}
