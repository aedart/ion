import { type ConcernConstructor } from '@aedart/contracts/support/concerns';
import { hasConcern } from './hasConcern.js';

/**
 * Determine if the target uses given concerns
 *
 * **Note**: _When multiple concerns are given, then target must use all
 * specified concerns, before this function returns `true`._
 *
 * @param {unknown} target Class constructor or instance
 * @param {...ConcernConstructor} concerns
 *
 * @returns {boolean}
 */
export function usesConcerns(target: unknown, ...concerns: ConcernConstructor[]): boolean
{
    if (target === null || target === undefined || concerns.length === 0) {
        return false;
    }

    for (let i = 0, limit: number = concerns.length; i < limit; i++) {
        if (!hasConcern(target, concerns[i])) {
            return false;
        }
    }

    return true;
}
