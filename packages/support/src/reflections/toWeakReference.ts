import { isset } from "@aedart/support/misc";

/**
 * Converts target object to a weak reference, if not already
 * 
 * @param {WeakRef<object> | object | undefined} [target=undefined]
 * 
 * @returns {WeakRef<object> | undefined} Undefined if no target given or target is not an object
 */
export function toWeakReference(target: WeakRef<object> | object | undefined = undefined): WeakRef<object> | undefined
{
    if (!isset(target)) {
        return undefined;
    }
    
    if (target instanceof WeakRef) {
        return target;
    }

    return new WeakRef(target as object);
}