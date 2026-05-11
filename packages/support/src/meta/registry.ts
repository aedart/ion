import { Repository } from '@aedart/contracts/support/meta/index.js';
import "./polyfill.js";

/**
 * The internal registry for all metadata repositories.
 *
 * @internal
 *
 * @type {WeakMap<object, Repository>}
 */
export const registry = new WeakMap<object, Repository>();

/**
 * Map of decorated members to their corresponding metadata objects.
 *
 * @internal
 *
 * @type {WeakMap<object, Record<PropertyKey, unknown>>}
 */
export const MEMBER_TO_METADATA = new WeakMap<object, Record<PropertyKey, unknown>>();

/**
 * Set of metadata objects that have already been flushed.
 *
 * @internal
 *
 * @type {WeakSet<object>}
 */
export const FLUSHED_METADATA = new WeakSet<object>();
