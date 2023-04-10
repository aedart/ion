import { unset as _unset } from 'lodash-es';
import type {Key} from "@aedart/contracts/support";

/**
 * Remove value in object at given path
 * (Alias for Lodash' {@link import('lodash').unset unset}) method
 * 
 * @type {(object: any, path: Key) => boolean}
 */
export const forget = _unset; 