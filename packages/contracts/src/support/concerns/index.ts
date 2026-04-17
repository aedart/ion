/**
 * Contracts Support Concerns identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_CONCERNS: unique symbol = Symbol('@aedart/contracts/support/concerns');

import AliasSource from './AliasSource.js';
import Concern from './Concern.js';
import ConcernConfiguration from './ConcernConfiguration.js';
import ConcernConstructor from './ConcernConstructor.js';
export { type AliasSource, type Concern, type ConcernConfiguration, type ConcernConstructor };

export * from './exceptions/index.js';
export * from './types.js';
