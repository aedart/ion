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

import Repository from './Repository';
export {
    type Repository
}

export * from './loaders/index';
export * from './exceptions/index';
export type * from './types';