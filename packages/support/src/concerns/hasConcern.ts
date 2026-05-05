import { type ConstructorLike } from '@aedart/contracts';
import { CONCERN_REGISTRY, type ConcernConstructor } from '@aedart/contracts/support/concerns';
import { hasConcernRegistry } from './hasConcernRegistry.js';

/**
 * Determine if target uses a single concern
 *
 * @param {unknown} target
 * @param {ConcernConstructor} concern
 *
 * @returns {boolean}
 */
export function hasConcern(target: unknown, concern: ConcernConstructor): boolean
{
    let constructor = (typeof target === 'function')
        ? target as ConstructorLike
        : (target as object).constructor as ConstructorLike;

    while (constructor !== null && constructor !== Object) {
        if (hasConcernRegistry(constructor)) {
            const registry: Set<ConcernConstructor> = constructor[CONCERN_REGISTRY];
            if (registry.has(concern)) {
                return true;
            }
        }

        constructor = Reflect.getPrototypeOf(constructor) as ConstructorLike;
    }

    return false;
}
