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
    // 1. If repository already exists for this specific target, return it.
    if (registry.has(target)) {
        return registry.get(target)!;
    }

    // 2. Otherwise, we create a new one. 
    // We MUST find the closest ancestor that has a repository to maintain the chain.
    const parent = findRepository(Object.getPrototypeOf(target));

    const repo = new MetaRepository(target, parent);
    registry.set(target, repo);

    return repo;
}
