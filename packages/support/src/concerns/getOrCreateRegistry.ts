import { type ConstructorLike } from "@aedart/contracts";
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

    // Safe: At this point the registry has been defined and is safe to return!
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (target as WithConcernRegistry<typeof target>)[CONCERN_REGISTRY] as Set<ConcernConstructor>;
}