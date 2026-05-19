import { ConstructorLike } from "@aedart/contracts";
import { Repository } from '@aedart/contracts/support/meta';
import MetaRepository from './MetaRepository.js';
import { registry } from './registries.js';

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
    // Return repository if target already has one.
    if (registry.has(target)) {
        return registry.get(target)!;
    }

    // Collect the inheritance chain from child to root
    const chain: object[] = [];
    let current: object | null = target;

    while (
        current !== null &&
        typeof current === 'function' &&
        current.name !== 'Function' && // Stops at native Function
        current !== Object.prototype
    ) {
        // Skip further traversal if we hit a class already in the registry
        if (registry.has(current)) {
            chain.push(current);
            break;
        }

        chain.push(current);
        current = Object.getPrototypeOf(current) as ConstructorLike | null;
    }

    // Process the chain in reverse (from root / the deepest parent down to child)
    let parentRepo: Repository | undefined = undefined;

    for (let i = chain.length - 1; i >= 0; i--) {
        const currentTarget = chain[i];

        // If it already exists, just grab it to use as the next parentRepo
        if (registry.has(currentTarget)) {
            parentRepo = registry.get(currentTarget)!;
        } else {
            // Create, register, and link
            const repo: Repository = new MetaRepository(currentTarget, parentRepo);
            registry.set(currentTarget, repo);
            
            parentRepo = repo;
        }
    }

    // The final parentRepo will be the repository for the initial target
    return parentRepo!;
}
