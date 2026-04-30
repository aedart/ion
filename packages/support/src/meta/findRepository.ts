// @aedart/support/meta/findRepository.js
import { Repository } from '@aedart/contracts/support/meta';
import { registry } from './registry.js';

/**
 * Find the nearest parent repository in the prototype chain.
 *
 * @param {object|null} target
 *
 * @returns {Repository | undefined}
 */
export function findRepository(target: object | null): Repository | undefined
{
    let current = target;

    while (current !== null) {
        // 1. Check if the current target has a repository
        const repo = registry.get(current);
        if (repo !== undefined) {
            return repo;
        }

        // 2. Move up to the prototype (parent class or parent prototype)
        current = Object.getPrototypeOf(current);
    }

    return undefined;
}
