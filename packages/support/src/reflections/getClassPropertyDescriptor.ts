import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";

/**
 * Returns a {@link PropertyDescriptor} object, from target class' prototype that matches given property key
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
    return Reflect.getOwnPropertyDescriptor(
        Reflect.getPrototypeOf(target),
        key
    );
}