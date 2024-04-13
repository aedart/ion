/**
 * Support Services identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_SERVICES: unique symbol = Symbol('@aedart/contracts/support/services');

import ServiceProvider from "./ServiceProvider";
import ServiceProviderConstructor from "./ServiceProviderConstructor";
export {
    type ServiceProvider,
    type ServiceProviderConstructor,
}