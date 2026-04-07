import { ConstructorLike } from '@aedart/contracts';
import { FUNCTION_PROTOTYPE } from '@aedart/contracts/support/reflections';

/**
 * Returns the parent class of given target class
 *
 * **Note**: _If target has a parent that matches
 * [FUNCTION_PROTOTYPE]{@link import('@aedart/contracts/support/reflections').FUNCTION_PROTOTYPE}, then `null` is returned!_
 *
 * @param {ConstructorLike} target The target class
 *
 * @returns {ConstructorLike | null} Parent class or `null`, if target has no parent class.
 *
 * @throws {TypeError}
 */
export function getParentOfClass(target: ConstructorLike): ConstructorLike | null
{
    if (target === null || target === undefined) {
        throw new TypeError('getParentOfClass() expects a target class as argument');
    }

    const parent = Reflect.getPrototypeOf(target);

    if (parent === null || parent === FUNCTION_PROTOTYPE) {
        return null;
    }

    return parent as ConstructorLike;
}
