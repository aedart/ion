import type {ConstructorLike} from "@aedart/contracts";

/**
 * Determine if target class is a subclass (_child class_) of given superclass (_parent class_)
 *
 * **Note**: _Method determines if target is a child of given superclass, by checking if the `target.prototype`
 * is an instance of given superclass (`target.prototype instanceof superclass`)
 * However, if given target or superclass does not have a prototype property, then `false` is returned._
 *
 * @param {object} target
 * @param {ConstructorLike} superclass
 *
 * @returns {boolean} `true` if target is a subclass of given superclass, `false` otherwise.
 */
export function isSubclass(target: object, superclass: ConstructorLike): boolean
{
    // Fast-exit: if they are the same, or superclass is not a constructor/function
    if (target === superclass || typeof superclass !== 'function') {
        return false;
    }

    try {
        // Access prototype once. instanceof returns false if target.prototype is null/undefined.
        return (target as any).prototype instanceof superclass;
    } catch {
        // Handle edge cases where target might be a Proxy or have a revoked prototype
        return false;
    }
}
