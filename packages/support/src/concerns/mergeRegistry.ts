import { type ConstructorLike } from '@aedart/contracts';
import {
    CONCERN_REGISTRY,
    type ConcernConstructor,
    type WithConcernRegistry,
} from '@aedart/contracts/support/concerns';
import { AlreadyAppliedError } from './exceptions/index.js';
import { hasConcernRegistry } from './hasConcernRegistry.js';

/**
 * Merges concern registry
 *
 * @param {ConstructorLike} target
 * @param {ConcernConstructor} concern
 * @param {Set<ConcernConstructor>} targetRegistry
 */
export function mergeRegistry(
    target: ConstructorLike,
    concern: ConcernConstructor,
    targetRegistry: Set<ConcernConstructor>,
): void
{
    if (!hasConcernRegistry(concern)) {
        return;
    }
    const sourceRegistry: Set<ConcernConstructor> = (concern as WithConcernRegistry<typeof concern>)[CONCERN_REGISTRY];

    // We use a standard for...of or convert to array for the cached loop,
    // but since Set doesn't have a length index, we use the Set iterator.
    // However, for strict compliance with your performance rules:
    const entries = Array.from(sourceRegistry);
    for (let i = 0, limit: number = entries.length; i < limit; i++) {
        const nestedConcern = entries[i];

        if (targetRegistry.has(nestedConcern)) {
            throw new AlreadyAppliedError(
                target,
                nestedConcern,
                `Nested concern ${nestedConcern.name} (from ${concern.name}) is already applied.`,
            );
        }

        targetRegistry.add(nestedConcern);
    }
}
