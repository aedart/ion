import {
    ServiceProvider,
    ServiceProviderConstructor,
} from "@aedart/contracts/support/services";
import {
    BindingTuple,
    IdentifierAliasTuple,
    IdentifierInstanceTuple,
} from "@aedart/contracts/container";
import { Items } from "@aedart/contracts/config";
import BootstrapperConstructor from "../BootstrapperConstructor";
import Application from '../Application';

/**
 * Application Configurator
 * 
 * Responsible for the initial setup and configuration of a given application,
 * e.g. registration of "core" bindings, bootstrappers, service providers, ...etc.
 */
export default interface Configurator
{
    /**
     * Set the application that must be configured
     *
     * @param {Application} app
     *
     * @return {this}
     */
    for(app: Application): this;

    /**
     * Add configuration items for the application
     * 
     * @see {import('@aedart/contracts/config').Repository}
     * 
     * @param {Items} items
     * 
     * @return {this}
     */
    with(items: Items): this;
    
    /**
     * Add "core" bindings to be registered
     * 
     * @param {BindingTuple[]} bindings
     * 
     * @return {this}
     */
    withBindings(bindings: BindingTuple[]): this;

    /**
     * Add "core" shared bindings to be registered
     *
     * @param {BindingTuple[]} bindings
     *
     * @return {this}
     */
    withSingletons(bindings: BindingTuple[]): this;

    /**
     * Add "core" existing object instances to be registered as shared bindings
     * 
     * @param {IdentifierInstanceTuple[]} instances
     * 
     * @returns {this}
     */
    withInstances(instances: IdentifierInstanceTuple[]): this;

    /**
     * Add "core" aliases to be registered
     * 
     * @param {IdentifierAliasTuple[]} aliases
     * 
     * @return {this}
     */
    withAliases(aliases: IdentifierAliasTuple[]): this;
    
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
     * Applies setup and configuration of the application and returns it
     * 
     * @returns {Application}
     * 
     * @throws {ConfigurationException}
     */
    apply(): Application;
}