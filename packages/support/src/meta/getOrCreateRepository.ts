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
    console.log(`[getOrCreateRepository] Target:`, target);
    
    // 1. Return existing if we have it
    let repo = registry.get(target);
    if (repo !== undefined) {
        return repo;
    }

    const proto = Object.getPrototypeOf(target);
    console.log(`[getOrCreateRepository] Walking up to proto:`, proto);
    
    // 2. Find the closest existing repository in the inheritance chain
    // Use the iterative findRepository we optimized earlier!
    const parent = findRepository(Object.getPrototypeOf(target));
    console.log(`[getOrCreateRepository] Found Parent:`, parent?.owner);

    // 3. Create and register the new repository linked to that parent
    repo = new MetaRepository(target, parent);
    registry.set(target, repo);

    return repo;
}
