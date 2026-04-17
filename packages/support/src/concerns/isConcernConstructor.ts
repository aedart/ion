import { CONCERN_CLASS } from '@aedart/contracts/support/concerns';
import type { ConcernConstructor } from '@aedart/contracts/support/concerns';

/**
 * Determine if target is a valid concern constructor
 *
 * @param {any} target
 *
 * @returns {target is ConcernConstructor}
 */
export function isConcernConstructor(target: any): target is ConcernConstructor
{
    return typeof target === 'function'
        && target[CONCERN_CLASS] === true;
}
