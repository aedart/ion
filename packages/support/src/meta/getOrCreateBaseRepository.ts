import { Repository } from '@aedart/contracts/support/meta/index.js';
import { findRepository } from './findRepository.js';
import MetaRepository from './MetaRepository.js';
import { registry } from './registry.js';

/**
 * Gets the existing repository for a target, or creates a new one
 * properly linked to the inheritance chain.
 *
 * **Note**: This function does NOT perform discovery and flushing of staged metadata!
 *
 * @param {object} target
 *
 * @returns {Repository}
 */
export function getOrCreateBaseRepository(target: object): Repository
{
    let repo = registry.get(target);
    if (repo !== undefined) {
        return repo;
    }

    const parent = findRepository(Object.getPrototypeOf(target) as object);

    repo = new MetaRepository(target, parent);
    registry.set(target, repo);

    return repo;
}
