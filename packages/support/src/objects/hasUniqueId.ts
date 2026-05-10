import ObjectId from './ObjectId.js';

/**
 * Alias for {@link ObjectId.has}
 *
 * @param {object} target
 *
 * @returns {boolean}
 */
export const hasUniqueId = (target: object) => ObjectId.has(target);
