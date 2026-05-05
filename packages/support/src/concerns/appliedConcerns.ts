import { type ConstructorLike } from '@aedart/contracts';
import { CONCERN_REGISTRY, type ConcernConstructor } from '@aedart/contracts/support/concerns';
import { hasConcernRegistry } from './hasConcernRegistry.js';

/**
 * Returns a list of all concerns applied to the target
 *
 * @param {any} target Class constructor or instance
 *
 * @returns {ConcernConstructor[]}
 */
export function appliedConcerns(target: unknown): ConcernConstructor[]
{
    if (target === null || target === undefined) {
        return [];
    }

    let constructor = (typeof target === 'function')
        ? target as ConstructorLike
        : (target as object).constructor as ConstructorLike;

    const allConcerns = new Set<ConcernConstructor>();

    while (constructor !== null && constructor !== Object) {
        if (hasConcernRegistry(constructor)) {
            const registry = constructor[CONCERN_REGISTRY];

            // Standard loop over the Set iterator for performance
            for (const concern of registry) {
                allConcerns.add(concern);
            }
        }

        constructor = Reflect.getPrototypeOf(constructor) as ConstructorLike;
    }

    return Array.from(allConcerns);
}
