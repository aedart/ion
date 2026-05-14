import { type MemberAddress } from '@aedart/contracts/support/meta';
import { getOrCreateOwnerContext } from './getOrCreateOwnerContext.js';
import { addressRegistry } from './registries.js';

/**
 * Register an address for the given member, in the given owner
 *
 * @param {object} owner
 * @param {object} member
 * @param {MemberAddress} address
 * 
 * @throws {TypeError}
 */
export function registerAddress(
    owner: object,
    member: object,
    address: MemberAddress,
): void
{
    // "Force" set the context for the address,...
    address.ctx = getOrCreateOwnerContext(owner);

    // Abort if member is of "field" kind (in which case the member is `undefined`) 
    if (address.kind === 'field') {
        throw new TypeError(`Unable to register address for "${String(address.name)}": "field" type is not supported.`);
    }
    
    // Store two entries using same address, when accessor given (for both the `get` and `set` methods)
    if (address.kind === 'accessor') {
        addressRegistry.set((member as Record<PropertyKey, object>)['get'], address);    
        addressRegistry.set((member as Record<PropertyKey, object>)['set'], address);
        return;
    }
    
    // Store address using the member as provided...
    addressRegistry.set(member, address);
}
