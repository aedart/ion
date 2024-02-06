/**
 * Support Mixins identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_MIXINS: unique symbol = Symbol('@aedart/contracts/support/mixins');

/**
 * Symbol used by "apply mixin" and "is application of" functions
 * 
 * @type {symbol}
 */
export const APPLIED_MIXIN: unique symbol = Symbol.for('__mixwith_appliedMixin');

/**
 * Symbol used by the mixin wrap and unwrap functions
 *
 * @type {symbol}
 */
export const WRAPPED_MIXIN: unique symbol = Symbol.for('__mixwith_wrappedMixin');

/**
 * Symbol used for by a "cache" mixin to ensure a mixin is only applied once
 * 
 * @type {symbol}
 */
export const CACHED_APPLICATIONS: unique symbol = Symbol.for('__mixwith_cachedApplications');

export * from './types'