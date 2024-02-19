/**
 * Determine if target object is "concat spreadable"
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
        
        // Must have symbol and it must be set to true
        && Reflect.has(target, Symbol.isConcatSpreadable)
        && target[Symbol.isConcatSpreadable] === true
    
        // But, a `length` property MUST also be present and be greater than or equal to 0
        && Reflect.has(target, 'length')
        && target.length >= 0;
}