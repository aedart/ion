import { Repository } from '@aedart/contracts/support/meta/index.js';
import { discoverAndFlush } from './discoverAndFlush.js';
import { getOrCreateBaseRepository } from './getOrCreateBaseRepository.js';

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
    // 1. Discovery & Flush (if not already flushed)
    discoverAndFlush(target);

    // 2. Return the base repository
    return getOrCreateBaseRepository(target);
}
