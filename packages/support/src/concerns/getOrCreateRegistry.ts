import { CONCERN_REGISTRY, type ConcernConstructor } from '@aedart/contracts/support/concerns';

/**
 * Get or create the Concern Registry on the target constructor
 *
 * @param {any} target
 *
 * @returns {Set<ConcernConstructor>}
 */
export function getOrCreateRegistry(target: any): Set<ConcernConstructor>
{
    if (!Reflect.has(target, CONCERN_REGISTRY)) {
        Reflect.defineProperty(target, CONCERN_REGISTRY, {
            value: new Set<ConcernConstructor>(),
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }

    return target[CONCERN_REGISTRY];
}
