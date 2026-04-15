/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 *
 * Contracts Support Mixins identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_MIXINS: unique symbol = Symbol('@aedart/contracts/support/mixins');

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 *
 * Symbol used by "apply mixin" and "is application of" functions
 *
 * @type {symbol}
 */
export const APPLIED_MIXIN: unique symbol = Symbol.for('__mixwith_appliedMixin');

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 *
 * Symbol used by the mixin wrap and unwrap functions
 *
 * @type {symbol}
 */
export const WRAPPED_MIXIN: unique symbol = Symbol.for('__mixwith_wrappedMixin');

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 *
 * Symbol used for by a "cache" mixin to ensure a mixin is only applied once
 *
 * @type {symbol}
 */
export const CACHED_APPLICATIONS: unique symbol = Symbol.for('__mixwith_cachedApplications');

export * from './types.js';
