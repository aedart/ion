import type { ConstructorLike } from "@aedart/contracts";
import { assertHasPrototypeProperty } from "./assertHasPrototypeProperty";

/**
 * Returns a {@link PropertyDescriptor} object, from target's prototype that matches given property key
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
 * 
 * @param {ConstructorLike} target Class that contains property in its prototype
 * @param {PropertyKey} key Name of the property
 *
 * @return {PropertyDescriptor|undefined} Property descriptor or `undefined` if property does
 *                                        not exist in target's prototype.
 *
 * @throws {TypeError} If target is not an object or has no prototype
 */
export function getClassPropertyDescriptor(target: ConstructorLike, key: PropertyKey): PropertyDescriptor|undefined
{
    assertHasPrototypeProperty(target);

    return Reflect.getOwnPropertyDescriptor(
        target.prototype,
        key
    );
}