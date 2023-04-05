import {has as _has} from 'lodash-es';
import type { PropertyPath } from 'lodash';

/**
 * Determine if object has property
 * (Alias for Lodash' {@link import('lodash').has has}) method
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * 
 * @type {<T>(object: T, path: PropertyPath) => boolean}
 */
export const has: <T>(object: T, path: PropertyPath ) => boolean = _has;