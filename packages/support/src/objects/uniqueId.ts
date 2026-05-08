import ObjectId from './ObjectId.js';

/**
 * Alias for {@link ObjectId.get}
 * 
 * @param {object} target
 * 
 * @returns {number}
 */
export const uniqueId = (target: object) => ObjectId.get(target); 
