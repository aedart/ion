/**
 * Core identifier
 *
 * @type {Symbol}
 */
export const CORE: unique symbol = Symbol('@aedart/contracts/core');

/**
 * Core Application identifier
 * 
 * _Alias for the {@link CORE} identifier_
 * 
 * @type {typeof CORE}
 */
export const APPLICATION: symbol = CORE;

/**
 * Application Environment binding identifier
 * 
 * @type {Symbol}
 */
export const APP_ENV: unique symbol = Symbol('APP_ENV');

/**
 * Configuration Source identifier
 * 
 * @type {Symbol}
 * 
 * @see {import('@aedart/contracts/config').Source}
 */
export const CONFIG_SOURCE: unique symbol = Symbol('@aedart/contracts/core/config/source');

import Application from "./Application";
import Bootstrapper from "./Bootstrapper";
import BootstrapperConstructor from "./BootstrapperConstructor";
export {
    type Application,
    type Bootstrapper,
    type BootstrapperConstructor
}

export * from './exceptions/index';
export * from './configuration/index';
export * from './types';