/**
 * Determine if target object has a prototype property defined
 * 
 * **Warning**: _This method is NOT the same as checking if {@link Reflect.getPrototypeOf} of an object is `null`!_
 * _The method literally checks if a "prototype" property is defined in target, that it is not `null` or `undefined`,
 * and that its of the [type]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof} 'object'!_
 * 
 * @param {object} target
 * 
 * @returns {boolean}
 */
export function hasPrototypeProperty(target: object): boolean
{
    return typeof target?.prototype == 'object' && target.prototype !== null;
}