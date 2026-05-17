import { type OwnerContext as OwnerContextContract } from '@aedart/contracts/support/meta';
import OwnerContext from './OwnerContext.js';
import { contextCache } from './registries.js';

/**
 * Returns the "owner context" for owner, or creates a new context if one does not exist
 *
 * @param {object} owner
 *
 * @returns {OwnerContext}
 */
export function getOrCreateOwnerContext(owner: object): OwnerContextContract
{
    let ctx = contextCache.get(owner);

    if (!ctx) {
        ctx = new OwnerContext(owner);

        contextCache.set(owner, ctx);
    }

    return ctx;
}
