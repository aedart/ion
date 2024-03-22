/**
 * Determine if value is of the type [Identifier]{@link import('@aedart/contracts/container').Identifier}.
 * 
 * @param {unknown} value
 * 
 * @return {boolean}
 */
export function isBindingIdentifier(value: unknown): boolean
{
    if (value === undefined || value === null) {
        return false;
    }

    return [ 'string', 'number', 'symbol', 'object', 'function' ].includes(typeof value);
}