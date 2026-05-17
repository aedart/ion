/**
 * Contracts Support Meta identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_META: unique symbol = Symbol('@aedart/contracts/support/meta');

import MemberAddress from './MemberAddress.js';
import MetaEntry from './MetaEntry.js';
import OwnerContext from './OwnerContext.js';
import Repository from './Repository.js';
export { type MemberAddress, type MetaEntry, type OwnerContext, type Repository };

export type * from './types.js';
