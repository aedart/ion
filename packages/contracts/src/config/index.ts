/**
 * Config identifier
 *
 * @type {Symbol}
 */
export const CONFIG: unique symbol = Symbol('@aedart/contracts/config');

import Repository from './Repository';
export {
    type Repository
}

export type * from './types';