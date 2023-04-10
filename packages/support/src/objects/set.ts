import { set as _set } from 'lodash-es';
import type {Key} from "@aedart/contracts/support";

/**
 * Set value in object at given path
 * (Alias for Lodash' {@link import('lodash').set set}) method
 *
 * 
 * @type {{<T extends object>(object: T, path: Key, value: any): T, <TResult>(object: object, path: Key, value: any): TResult}}
 */
export const set = _set;