import { set as _set } from 'lodash-es';

/**
 * Set value in object at given path
 * (Alias for Lodash' {@link import('lodash').set set}) method
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * 
 * @type {{<T extends object>(object: T, path: PropertyPath, value: any): T, <TResult>(object: object, path: PropertyPath, value: any): TResult}}
 */
export const set = _set;