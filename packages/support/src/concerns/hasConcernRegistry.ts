import { type ConstructorLike } from '@aedart/contracts';
import { CONCERN_REGISTRY, type WithConcernRegistry } from '@aedart/contracts/support/concerns';

/**
 * Determine if target has a concern registry
 *
 * @param {ConstructorLike} target
 *
 * @returns {target is WithConcernRegistry<typeof target>}
 */
export function hasConcernRegistry(
    target: ConstructorLike,
): target is WithConcernRegistry<typeof target>
{
    return Reflect.has(target, CONCERN_REGISTRY);
}
