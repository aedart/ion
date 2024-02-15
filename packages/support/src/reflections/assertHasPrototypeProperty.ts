import { hasPrototypeProperty } from "./hasPrototypeProperty";

/**
 * Assert that given target object has a "prototype" property defined
 * 
 * @see hasPrototypeProperty
 * 
 * @param {object} target
 * @param {string} [message]
 * 
 * @throws {TypeError} If target object does not have "prototype" property
 */
export function assertHasPrototypeProperty(target: object, message: string = 'target object has no "prototype" property'): void
{
    if (!hasPrototypeProperty(target)) {
        throw new TypeError(message);
    }
}