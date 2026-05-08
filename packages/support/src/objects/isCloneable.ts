import { CLONE, Cloneable } from '@aedart/contracts/support/objects';
import { hasMethod } from '../reflections/hasMethod.js';

/**
 * Determine if target object is cloneable.
 *
 * **Note**: _Method assumes that target is cloneable if it implements the
 * [Cloneable]{@link import('@aedart/constracts/support/objects').Cloneable} interface._
 *
 * @param {object} target
 *
 * @return {boolean}
 */
export function isCloneable(target: object): target is Cloneable
{
    return hasMethod(target, CLONE);
}
