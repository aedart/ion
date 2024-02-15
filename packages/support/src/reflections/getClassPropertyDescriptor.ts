import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";

/**
 * Returns a {@link PropertyDescriptor} object, from target's prototype that matches given property key
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
 * 
 * @param {ConstructorOrAbstractConstructor} target Class that contains property in its prototype
 * @param {PropertyKey} key Name of the property
 *
 * @return {PropertyDescriptor|undefined} Property descriptor or `undefined` if property does
 *                                        not exist in target's prototype.
 *
 * @throws {TypeError} If target is not an object or has no prototype
 */
export function getClassPropertyDescriptor(target: ConstructorOrAbstractConstructor, key: PropertyKey): PropertyDescriptor|undefined
{
    if (typeof target['prototype'] === 'undefined') {
        throw new TypeError('Target has not "prototype"');
    }

    return Reflect.getOwnPropertyDescriptor(
        target.prototype,
        key
    );
}