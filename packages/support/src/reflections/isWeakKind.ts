/**
 * Determine if object of a "weak" kind, e.g. `WeakRef`, `WeakMap` or `WeakSet`
 *
 * @param {object} value
 *
 * @return {boolean}
 */
export function isWeakKind(value: object): boolean
{
    return value && (
        value instanceof WeakRef
        || value instanceof WeakMap
        || value instanceof WeakSet
    );
}