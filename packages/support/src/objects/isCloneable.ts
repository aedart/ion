/**
 * Determine if target object is cloneable.
 * 
 * **Note**: _Method assumes that target is cloneable if it implements the
 * [Cloneable]{@link import('@aedart/constracts/support/objects').Cloneable} interface._
 * 
 * @param {object} target
 * 
 * @return {boolean}
 */
export function isCloneable(target: object): boolean
{
    return typeof target == 'object'
        && target !== null
        && Reflect.has(target, 'clone')
        && typeof target.clone == 'function';
}