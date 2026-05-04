/**
 * Determine if a given property key is a method in the target object.
 *
 * **Note**: This will return `true` if the property is a getter that returns a
 * function. Strict verification would require `Reflect.getOwnPropertyDescriptor`,
 * but that incurs significant GC pressure due to descriptor object allocation.
 *
 * @param {object} target - The target object to check.
 * @param {PropertyKey} property - The property key to look up.
 *
 * @returns {boolean} `true` if the property value is a function, `false` otherwise.
 */
export function isMethod(target: object, property: PropertyKey): boolean
{
    if (target == null) {
        return false;
    }

    // Capture the value once to avoid redundant lookups and reduce CPU overhead.
    const value: unknown = (target as Record<PropertyKey, unknown>)[property];
    return typeof value === 'function';
}
