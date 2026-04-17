import { type ConcernConstructor } from '@aedart/contracts/support/concerns';
import { hasConcern } from './hasConcern.js';

/**
 * Determine if the target uses all of the given concerns
 *
 * @param {any} target Class constructor or instance
 * @param {...ConcernConstructor} concerns
 *
 * @returns {boolean}
 */
export function usesConcerns(target: any, ...concerns: ConcernConstructor[]): boolean
{
    if (target === null || target === undefined || concerns.length === 0) {
        return false;
    }

    for (let i: number = 0, limit: number = concerns.length; i < limit; i++) {
        if (!hasConcern(target, concerns[i])) {
            return false;
        }
    }

    return true;
}
