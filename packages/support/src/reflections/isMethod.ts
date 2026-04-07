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
    if (target === null || target === undefined) {
        return false;
    }

    // Capture the value once to avoid redundant lookups and reduce CPU overhead.
    //
    // EDGE-CASE: This check will return true if the property is a "getter" that
    // returns a function. Strict verification would require Reflect.getOwnPropertyDescriptor,
    // but that incurs significant GC pressure due to object allocation.
    const value: unknown = (target as any)[property];

    return typeof value === 'function';
}
