/**
 * Config identifier
 *
 * @type {Symbol}
 */
export const CONFIG: unique symbol = Symbol('@aedart/contracts/config');

/**
 * Configuration Resolver identifier
 * 
 * @type {Symbol}
 */
export const CONFIG_RESOLVER: unique symbol = Symbol('@aedart/contracts/config/resolver');

import Repository from './Repository';
import Resolver from './Resolver';
export {
    type Repository,
    type Resolver
}

export * from './exceptions/index';
export type * from './types';