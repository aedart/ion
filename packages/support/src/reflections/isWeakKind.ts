/**
 * Determine if object of a "weak" kind, e.g. `WeakRef`, `WeakMap` or `WeakSet`
 *
 * @param {object|null} value
 *
 * @return {boolean}
 */
export function isWeakKind(value: object | null): boolean
{
    // Fast-exit for null, which is technically an 'object' in JS
    if (value === null) {
        return false;
    }

    return value instanceof WeakRef
        || value instanceof WeakMap
        || value instanceof WeakSet;
}