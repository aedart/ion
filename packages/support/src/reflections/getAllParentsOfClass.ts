import { ConstructorLike } from '@aedart/contracts';
import { getParentOfClass } from './getParentOfClass.js';

/**
 * Returns all parent classes of given target
 *
 * @see {getParentOfClass}
 *
 * @param {ConstructorLike} target The target class.
 * @param {boolean} [includeTarget=false] If `true`, then given target is included in the output as the first element.
 *
 * @returns {ConstructorLike[]} List of parent classes, ordered by the nearest parent first.
 *
 * @throws {TypeError}
 */
export function getAllParentsOfClass(
    target: ConstructorLike,
    includeTarget: boolean = false,
): ConstructorLike[]
{
    if (target === null || target === undefined) {
        throw new TypeError('getAllParentsOfClass() expects a target class as argument');
    }

    const output: ConstructorLike[] = [];
    let current: ConstructorLike | null = target;

    while (current !== null) {
        if (current !== target || includeTarget) {
            output.push(current);
        }

        current = getParentOfClass(current);
    }

    return output;
}
