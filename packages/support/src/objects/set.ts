import { set as _set } from 'lodash-es';

/**
 * Set value in object at given path
 * (Alias for Lodash' {@link import('lodash').set set}) method
 *
 * @typedef {import('@aedart/contracts/support').Key} Key
 * 
 * @type {{<T extends object>(object: T, path: Key, value: any): T, <TResult>(object: object, path: Key, value: any): TResult}}
 */
export const set = _set;