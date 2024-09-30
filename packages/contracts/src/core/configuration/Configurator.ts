import {
    ServiceProvider,
    ServiceProviderConstructor,
} from "@aedart/contracts/support/services";
import {
    Binding,
    BindingTuple,
    IdentifierInstanceTuple,
} from "@aedart/contracts/container";
import BootstrapperConstructor from "../BootstrapperConstructor";
import Application from '../Application';

/**
 * Application Configurator
 * 
 * Responsible for setup and configuration of a given application,
 * e.g. registration of "core" bindings, bootstrappers, service providers, ...etc.
 */
export default interface Configurator
{
    /**
     * Add "core" bindings to be registered
     * 
     * @param {(Binding | BindingTuple)[]} bindings
     * 
     * @return {this}
     */
    withBindings(bindings: (Binding | BindingTuple)[]): this;

    /**
     * Add "core" shared bindings to be registered
     *
     * @param {(Binding | BindingTuple)[]} bindings
     *
     * @return {this}
     */
    withSingletons(bindings: (Binding | BindingTuple)[]): this;

    /**
     * Add "core" existing object instances to be registered as shared bindings
     * 
     * @param {IdentifierInstanceTuple[]} instances
     * 
     * @returns {this}
     */
    withInstances(instances: IdentifierInstanceTuple[]): this;
    
    /**
     * Add "core" bootstrappers that application must use
     * 
     * @param {BootstrapperConstructor[]} bootstrappers
     * 
     * @returns {this}
     */
    withBootstrappers(bootstrappers: BootstrapperConstructor[]): this;

    /**
     * Add "core" service providers to be registered by the application
     * 
     * @param {(ServiceProvider | ServiceProviderConstructor)[]} providers
     * 
     * @returns {this}
     */
    withServiceProviders(providers: (ServiceProvider | ServiceProviderConstructor)[]): this;

    /**
     * Set the application that must be configured
     * 
     * @param {Application} app
     * 
     * @return {this}
     */
    for(app: Application): this;
    
    /**
     * TODO: More specifics about what this should do
     * 
     * Applies setup and configuration of the application and returns it
     * 
     * @returns {Application}
     */
    apply(): Application;
}