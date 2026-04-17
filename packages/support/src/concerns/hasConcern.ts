import {CONCERN_REGISTRY, type ConcernConstructor} from '@aedart/contracts/support/concerns';

/**
 * Determine if target uses a single concern
 *
 * @param {any} target
 * @param {ConcernConstructor} concern
 *
 * @returns {boolean}
 */
export function hasConcern(target: any, concern: ConcernConstructor): boolean
{
    let constructor = (typeof target === 'function')
        ? target
        : target.constructor;

    while (constructor !== null && constructor !== Object) {
        if (Reflect.has(constructor, CONCERN_REGISTRY)) {
            const registry: Set<ConcernConstructor> = constructor[CONCERN_REGISTRY];
            if (registry.has(concern)) {
                return true;
            }
        }

        constructor = Reflect.getPrototypeOf(constructor);
    }

    return false;
}
