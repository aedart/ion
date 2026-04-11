import { set as _set } from 'lodash-es';

/**
 * Set value in object at given path.
 *
 * (Alias for Lodash' [set]{@link import('lodash-es').set})
 *
 * @param {object} object
 * @param {import('@aedart/contracts/support').Key} path
 * @param {any} value
 *
 * @returns {any}
 */
export const set: typeof _set = _set;
