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
    let address = addressRegistry.get(member as object);

    // Create member address (possibly without "owner context")...
    address ??= new Address(owner, context.static ?? false, context.kind, context.name);

    return address;
}
