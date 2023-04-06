import {hasIn as _hasIn} from 'lodash-es';

/**
 * Determine if path is a property of given object
 * 
 * (Alias for Lodash' {@link import('lodash').hasIn hasIn}) method
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * 
 * @type {<T>(object: T, path: PropertyPath) => boolean}
 */
export const has = _hasIn;