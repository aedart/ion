/**
 * Determine if given property key is a method in target
 * 
 * @param {object} target
 * @param {PropertyKey} property
 * 
 * @return {boolean}
 */
export function isMethod(target: object, property: PropertyKey): boolean
{
    return typeof target == 'object'
        && target !== null
        && Reflect.has(target, property)
        && typeof target[property as keyof typeof target] == 'function';
}