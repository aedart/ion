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

import Application from "./Application";
export {
    type Application,
}