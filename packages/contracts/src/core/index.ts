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

import Application from "./Application";
import Bootstrapper from "./Bootstrapper";
import BootstrapperConstructor from "./BootstrapperConstructor";
export {
    type Application,
    type Bootstrapper,
    type BootstrapperConstructor
}

export * from './configuration/index';
export * from './types';