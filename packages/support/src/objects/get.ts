import { get as _get } from 'lodash-es';

/**
 * Get value from object that matches given path.
 *
 * @alias import('lodash-es').get
 *
 * @param {object | null | undefined} object
 * @param {string | string[] | number} path
 * @param {any} [defaultValue]
 *
 * @returns {any}
 */
export const get: typeof _get = _get;
