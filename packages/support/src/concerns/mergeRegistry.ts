import { CONCERN_REGISTRY, type ConcernConstructor } from '@aedart/contracts/support/concerns';
import { AlreadyAppliedError } from './exceptions/index.js';

/**
 * Merges concern registry
 *
 * @param target
 * @param {ConcernConstructor} concern
 * @param {Set<ConcernConstructor>} targetRegistry
 */
export function mergeRegistry(
    target: any,
    concern: ConcernConstructor,
    targetRegistry: Set<ConcernConstructor>,
): void
{
    if (!Reflect.has(concern, CONCERN_REGISTRY)) {
        return;
    }

    const sourceRegistry: Set<ConcernConstructor> = (concern as any)[CONCERN_REGISTRY];

    // We use a standard for...of or convert to array for the cached loop,
    // but since Set doesn't have a length index, we use the Set iterator.
    // However, for strict compliance with your performance rules:
    const entries = Array.from(sourceRegistry);
    for (let i: number = 0, limit: number = entries.length; i < limit; i++) {
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
