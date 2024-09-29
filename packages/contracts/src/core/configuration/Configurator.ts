import {
    ServiceProvider,
    ServiceProviderConstructor,
} from "@aedart/contracts/support/services";
import BootstrapperConstructor from "../BootstrapperConstructor";
import Application from '../Application';

/**
 * TODO: Incomplete...
 * 
 * Application Configurator
 * 
 * Responsible for setup and configuration of a given application,
 * e.g. registration of "core" bindings, bootstrappers, service providers, ...etc.
 */
export default interface Configurator
{
    /**
     * TODO: Move to application interface!
     * 
     * Set the "core" bootstrappers the application must use
     * 
     * @param {BootstrapperConstructor[]} bootstrappers
     * 
     * @returns {this}
     */
    withBootstrappers(bootstrappers: BootstrapperConstructor[]): this;

    /**
     * TODO: Move to application interface!
     * 
     * Set the "core" service providers to be registered by the application
     * 
     * @param {(ServiceProvider | ServiceProviderConstructor)[]} providers
     * 
     * @returns {this}
     */
    withServiceProviders(providers: (ServiceProvider | ServiceProviderConstructor)[]): this;

    /**
     * TODO: This method should be the only method in this interface...
     * 
     * Applies setup and configuration of the application and returns it
     * 
     * @returns {Application}
     */
    apply(): Application;
}