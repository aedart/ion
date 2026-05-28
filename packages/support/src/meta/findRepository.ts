import { Repository } from '@aedart/contracts/support/meta';
import { registry } from './registries.js';

/**
 * Find the meta repository for the given target
 *
 * @param {object|null} target
 *
 * @returns {Repository | undefined}
 */
export function findRepository(target: object | null): Repository | undefined
{
    if (!target) return undefined;

    return registry.get(target);
}
