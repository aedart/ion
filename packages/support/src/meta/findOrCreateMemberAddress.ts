import { type MemberAddress, type OwnerContext } from '@aedart/contracts/support/meta';
import Address from './Address.js';
import { addressRegistry } from './registries.js';

/**
 * Find or create "member address" for the given member
 *
 * @param {unknown} member
 * @param {ClassMemberDecoratorContext} context
 * @param {OwnerContext | undefined} [owner]
 *
 * @returns {MemberAddress}
 */
export function findOrCreateMemberAddress(
    member: unknown,
    context: ClassMemberDecoratorContext,
    owner?: OwnerContext,
): MemberAddress
{
    let addressMember = member as object;
    
    // When accessor is given, attempt to find address via the `get` method.
    // See `registerAddress()` for additional details!
    if (context.kind === 'accessor') {
        addressMember = (member as Record<PropertyKey, object>)['get'];
    }

    let address = addressRegistry.get(addressMember);

    // Create member address (possibly without "owner context")...
    address ??= new Address(owner, context.static ?? false, context.kind, context.name);

    return address;
}
