import type { ConstructorLike } from '@aedart/contracts';

/**
 * Determine if a target class is a subclass (_child class_) of a given superclass (_parent class_).
 *
 * **Note**: _Method determines if target is a child of the given superclass by checking if
 * `target.prototype` is an instance of the given superclass (`target.prototype instanceof superclass`).
 * If either the target or the superclass does not have a prototype property, `false` is returned._
 *
 * @param {object} target - The target class to check.
 * @param {ConstructorLike} superclass - The superclass to check against.
 *
 * @returns {boolean} `true` if target is a subclass of the given superclass, `false` otherwise.
 */
export function isSubclass(target: object, superclass: ConstructorLike): boolean
{
    // Fast-exit: if they are the same, or superclass is not a constructor/function
    if (target === superclass || typeof superclass !== 'function') {
        return false;
    }

    try {
        // Access prototype once. instanceof returns false if target.prototype is null/undefined.
        return (target as { prototype?: unknown; }).prototype instanceof superclass;
    } catch {
        // Handle edge cases where target might be a Proxy or have a revoked prototype
        return false;
    }
}
