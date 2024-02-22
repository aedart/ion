import {hasIn as _hasIn} from 'lodash-es';

/**
 * Determine if path is a property of given object
 * 
 * (Alias for Lodash' [hasIn]{@link import('lodash').hasIn}) method
 * 
 * @type {<T>(object: T, path: import('@aedart/contracts/support').Key) => boolean}
 */
export const has = _hasIn;