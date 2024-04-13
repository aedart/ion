/**
 * Support Services identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_SERVICES: unique symbol = Symbol('@aedart/contracts/support/services');

import Registrar from "./Registrar";
import ServiceProvider from "./ServiceProvider";
import ServiceProviderConstructor from "./ServiceProviderConstructor";
export {
    type Registrar,
    type ServiceProvider,
    type ServiceProviderConstructor,
}

export * from './exceptions/index';