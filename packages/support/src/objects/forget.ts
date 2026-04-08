import { unset as _unset } from 'lodash-es';

/**
 * Removes the property at path of object.
 *
 * (Alias for Lodash' [unset]{@link import('lodash-es').unset})
 *
 * @param {object} object
 * @param {import('@aedart/contracts/support').Key} path
 *
 * @returns {boolean} Returns true if the property is deleted, else false.
 */
export const forget: typeof _unset = _unset;
