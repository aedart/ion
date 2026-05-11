/**
 * Contracts Support Meta identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_META: unique symbol = Symbol('@aedart/contracts/support/meta');

import MetaEntry from './MetaEntry.js';
import Repository from './Repository.js';
import OwnerContext from "./OwnerContext.js";
import MemberAddress from "./MemberAddress.js";
export {
    type MetaEntry,
    type Repository,
    type OwnerContext,
    type MemberAddress
};

export type * from './types.js';
