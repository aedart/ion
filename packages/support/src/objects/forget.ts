import { unset as _unset } from 'lodash-es';

/**
 * Remove value in object at given path
 * (Alias for Lodash' {@link import('lodash').unset unset}) method
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * 
 * @type {(object: any, path: PropertyPath) => boolean}
 */
export const forget = _unset; 