/**
 * Determine if target object contains the well-known symbol {@link Symbol.isConcatSpreadable} and is set to `true`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
 *
 * @param {unknown} target
 *
 * @return {boolean}
 */
export function isConcatSpreadable(target: unknown): boolean
{
    return target !== null
        && target !== undefined
        && typeof target === 'object'
        && Symbol.isConcatSpreadable in target
        && (target as Record<symbol, unknown>)[Symbol.isConcatSpreadable] === true;
}
