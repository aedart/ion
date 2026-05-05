import { CONCERN_CLASS } from '@aedart/contracts/support/concerns';
import type { ConcernConstructor } from '@aedart/contracts/support/concerns';

/**
 * Determine if target is a valid concern constructor
 *
 * @param {unknown} target
 *
 * @returns {target is ConcernConstructor}
 */
export function isConcernConstructor(target: unknown): target is ConcernConstructor
{
    return typeof target === 'function'
        && (target as ConcernConstructor)[CONCERN_CLASS] === true;
}
