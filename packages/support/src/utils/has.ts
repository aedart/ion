import { has as _has } from 'lodash-es';

/**
 * Determine if object has property
 * (Alias for Lodash' {@link import('lodash').has has}) method
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * 
 * @type {<T>(object: T, path: PropertyPath) => boolean}
 */
export const has: Function = _has;