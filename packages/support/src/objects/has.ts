import { has as _has } from 'lodash-es';

/**
 * Checks if path is a direct property of object.
 *
 * (Alias for Lodash' [has]{@link import('lodash-es').has})
 *
 * @param {object | null | undefined} object
 * @param {import('@aedart/contracts/support').Key} path
 *
 * @returns {boolean}
 */
export const has: typeof _has = _has;
