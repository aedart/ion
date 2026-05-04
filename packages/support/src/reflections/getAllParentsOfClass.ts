import type { ConstructorLike } from '@aedart/contracts';
import { walkParents } from './walkParents.js';

/**
 * Returns all parent classes of given target.
 *
 * @param {ConstructorLike} target
 * @param {boolean} [includeTarget=false]
 *
 * @returns {ConstructorLike[]} Ordered by nearest parent first.
 *
 * @throws {TypeError}
 */
export function getAllParentsOfClass(
    target: ConstructorLike,
    includeTarget = false,
): ConstructorLike[]
{
    const output: ConstructorLike[] = [];

    for (const parent of walkParents(target, includeTarget)) {
        output.push(parent);
    }

    return output;
}
