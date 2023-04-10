import {hasIn as _hasIn} from 'lodash-es';
import type {Key} from "@aedart/contracts/support";

/**
 * Determine if path is a property of given object
 * 
 * (Alias for Lodash' {@link import('lodash').hasIn hasIn}) method
 * 
 * @type {<T>(object: T, path: Key) => boolean}
 */
export const has = _hasIn;