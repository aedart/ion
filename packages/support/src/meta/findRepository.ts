// @aedart/support/meta/findRepository.js
import { Repository } from '@aedart/contracts/support/meta';
import { registry } from './registry.js';

/**
 * Find the nearest parent repository in the prototype chain.
 *
 * @param {object} target
 *
 * @returns {Repository | undefined}
 */
export function findRepository(target: object): Repository | undefined
{
    let proto = Object.getPrototypeOf(target);

    while (proto !== null) {
        const repo = registry.get(proto);
        if (repo !== undefined) {
            return repo;
        }
        proto = Object.getPrototypeOf(proto);
    }

    return undefined;
}
