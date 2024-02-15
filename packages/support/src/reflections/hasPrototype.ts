/**
 * Determine if target object has a prototype property defined and that prototype is an object
 * 
 * @param {object} target
 * 
 * @returns {boolean}
 */
export function hasPrototype(target: object): boolean
{
    return Reflect.has(target, 'prototype') && typeof target.prototype == 'object';
}