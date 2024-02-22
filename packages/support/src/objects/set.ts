import { set as _set } from 'lodash-es';

/**
 * @typedef {import('@aedart/contracts/support').Key} Key
 */

/**
 * Set value in object at given path
 * (Alias for Lodash' [set]{@link import('lodash').set}) method
 * 
 * @type {{<T extends object>(object: T, path: Key, value: any): T, <TResult>(object: object, path: Key, value: any): TResult}}
 */
export const set = _set;