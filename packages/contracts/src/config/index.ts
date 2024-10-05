/**
 * Config identifier
 *
 * @type {Symbol}
 */
export const CONFIG: unique symbol = Symbol('@aedart/contracts/config');

/**
 * @deprecated TODO: Remove this ....
 * 
 * Configuration Loader Factory identifier
 * 
 * @type {Symbol}
 */
export const CONFIG_LOADER_FACTORY: unique symbol = Symbol('@aedart/contracts/config/loaders/factory');

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

export * from './loaders/index';
export * from './exceptions/index';
export type * from './types';