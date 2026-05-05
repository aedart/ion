import { type ConstructorLike } from '@aedart/contracts';
import {
    CONCERN_REGISTRY,
    type ConcernConstructor,
    type WithConcernRegistry,
} from '@aedart/contracts/support/concerns';
import { hasConcernRegistry } from './hasConcernRegistry.js';

/**
 * Get or create the Concern Registry on the target constructor
 *
 * @param {ConstructorLike} target
 *
 * @returns {Set<ConcernConstructor>}
 */
export function getOrCreateRegistry(target: ConstructorLike): Set<ConcernConstructor>
{
    if (!hasConcernRegistry(target)) {
        Reflect.defineProperty(target, CONCERN_REGISTRY, {
            value: new Set<ConcernConstructor>(),
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }

    return (target as WithConcernRegistry)[CONCERN_REGISTRY];
}
