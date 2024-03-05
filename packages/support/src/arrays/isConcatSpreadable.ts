/**
 * Determine if target object contains the well-known symbol {@link Symbol.isConcatSpreadable}
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
 * 
 * @param {object} target
 * 
 * @return {boolean}
 */
export function isConcatSpreadable(target: object): boolean
{
    return typeof target == 'object'
        && target !== null
        && Reflect.has(target, Symbol.isConcatSpreadable);
}