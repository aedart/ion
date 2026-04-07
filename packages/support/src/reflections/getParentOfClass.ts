import type { ConstructorLike } from "@aedart/contracts";
import { walkParents } from "./walkParents.js";

/**
 * Returns the nearest parent class or null if no parent exists.
 *
 * @param {ConstructorLike} target
 *
 * @returns {ConstructorLike | null}
 *
 * @throws {TypeError} If target is null or undefined.
 */
export function getParentOfClass(target: ConstructorLike): ConstructorLike | null
{
    const iterator = walkParents(target).next();

    return iterator.done
        ? null
        : iterator.value;
}
