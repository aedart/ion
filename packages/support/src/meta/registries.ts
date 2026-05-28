import {
    type MemberAddress,
    type OwnerContext,
    type Repository,
} from '@aedart/contracts/support/meta';

/**
 * The internal registry for all metadata repositories.
 *
 * @internal
 *
 * @type {WeakMap<object, Repository>}
 */
export const registry = new WeakMap<object, Repository>();

/**
 * Cache of Owner Context instances
 *
 * @internal
 *
 * @type {WeakMap<object, OwnerContext>}
 */
export const contextCache = new WeakMap<object, OwnerContext>();

/**
 * Member Address registry
 *
 * @internal
 *
 * @type {WeakMap<object, MemberAddress>}
 */
export const addressRegistry = new WeakMap<object, MemberAddress>();
