/**
 * Contracts Support Meta identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_META: unique symbol = Symbol('@aedart/contracts/support/meta');

/**
 * Unique symbol used for accessing a metadata repository on a target.
 */
// export const METADATA: unique symbol = Symbol('@aedart_metadata');

import MetaEntry from './MetaEntry.js';
import Repository from './Repository.js';
export { type MetaEntry, type Repository };

export type * from './types.js';
