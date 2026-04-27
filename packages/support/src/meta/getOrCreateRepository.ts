import Repository from '@aedart/contracts/support/meta/Repository.js';
import { findRepository } from './findRepository.js';
import MetaRepository from './MetaRepository.js';
import { registry } from './registry.js';

/**
 * Gets the existing repository for a target, or creates a new one
 * properly linked to the inheritance chain.
 *
 * @param {object} target
 *
 * @returns {Repository}
 */
export function getOrCreateRepository(target: object): Repository
{
    let repo = registry.get(target);

    if (repo === undefined) {
        const parent = findRepository(target);
        repo = new MetaRepository(target, parent);
        registry.set(target, repo);
    }

    return repo;
}
