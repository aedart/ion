import { CONCERN_REGISTRY, type ConcernConstructor } from '@aedart/contracts/support/concerns';

/**
 * Returns a list of all concerns applied to the target
 *
 * @param {any} target Class constructor or instance
 *
 * @returns {ConcernConstructor[]}
 */
export function appliedConcerns(target: any): ConcernConstructor[]
{
    if (target === null || target === undefined) {
        return [];
    }

    let constructor = (typeof target === 'function')
        ? target
        : target.constructor;

    const allConcerns = new Set<ConcernConstructor>();

    while (constructor !== null && constructor !== Object) {
        if (Reflect.has(constructor, CONCERN_REGISTRY)) {
            const registry: Set<ConcernConstructor> = constructor[CONCERN_REGISTRY];

            // Standard loop over the Set iterator for performance
            for (const concern of registry) {
                allConcerns.add(concern);
            }
        }

        constructor = Reflect.getPrototypeOf(constructor);
    }

    return Array.from(allConcerns);
}
