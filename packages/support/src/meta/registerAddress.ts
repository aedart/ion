import { type MemberAddress } from '@aedart/contracts/support/meta';
import { getOrCreateOwnerContext } from './getOrCreateOwnerContext.js';
import { addressRegistry } from './registries.js';

/**
 * Register an address for the given member, in the given owner
 *
 * @param {object} owner
 * @param {object} member
 * @param {MemberAddress} address
 */
export function registerAddress(
    owner: object,
    member: object,
    address: MemberAddress,
): void
{
    // "Force" set the context for the address,...
    address.ctx = getOrCreateOwnerContext(owner);

    addressRegistry.set(member, address);
}
