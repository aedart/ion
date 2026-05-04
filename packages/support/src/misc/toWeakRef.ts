/**
 * Wraps target into a {@link WeakRef}, if target is not already a weak reference
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef
 *
 * @template {WeakKey} T
 *
 * @param {WeakRef<T> | T | undefined} target
 *
 * @returns {WeakRef<T> | undefined} Returns undefined if given target is undefined
 */
export function toWeakRef<T extends WeakKey>(
    target: WeakRef<T> | T | undefined,
): WeakRef<T> | undefined
{
    if (target === undefined || target === null) {
        return undefined;
    }

    if (target instanceof WeakRef) {
        return target;
    }

    return new WeakRef<T>(target);
}
