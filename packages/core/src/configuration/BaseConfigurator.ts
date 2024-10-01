import type { Application, BootstrapperConstructor, Configurator} from "@aedart/contracts/core";
import type { ServiceProvider, ServiceProviderConstructor } from "@aedart/contracts/support/services";
import { AbstractClassError } from "@aedart/support/exceptions";
import { isset } from "@aedart/support/misc";
import {
    Binding,
    BindingTuple,
    IdentifierAliasTuple,
    IdentifierInstanceTuple
} from "@aedart/contracts/container";

/**
 * Base Configurator
 * 
 * @see {import('@aedart/contracts/core').Configurator}
 * 
 * @abstract
 */
export default abstract class BaseConfigurator implements Configurator {

    /**
     * The core application instance, or service container
     *
     * @type {Application}
     *
     * @protected
     */
    protected app: Application | undefined;

    /**
     * List of bindings to be registered
     * 
     * @type {(Binding | BindingTuple)[]}
     * 
     * @protected
     */
    protected bindings: (Binding | BindingTuple)[] = [];

    /**
     * List of shared bindings to be registered
     *
     * @type {(Binding | BindingTuple)[]}
     * 
     * @protected
     */
    protected singletons: (Binding | BindingTuple)[] = [];

    /**
     * List of object instances to be registered as shared bindings
     * 
     * @type {IdentifierInstanceTuple[]}
     * 
     * @protected
     */
    protected instances: IdentifierInstanceTuple[] = [];

    /**
     * 
     * List of aliases to be registered
     * 
     * @type {IdentifierAliasTuple[]}
     * 
     * @protected
     */
    protected aliases: IdentifierAliasTuple[] = [];
    
    /**
     * List of application bootstrappers
     * 
     * @type {BootstrapperConstructor[]}
     * 
     * @protected
     */
    protected bootstrappers: BootstrapperConstructor[] = [];

    /**
     * List of service providers to be registered
     * 
     * @type {(ServiceProvider | ServiceProviderConstructor)[]}
     * 
     * @protected
     */
    protected providers: (ServiceProvider | ServiceProviderConstructor)[] = [];
    
    /**
     * Create a new Application Configurator instance
     *
     * @param {Application} [app]
     */
    public constructor(app?: Application)
    {
        if (new.target === BaseConfigurator) {
            throw new AbstractClassError(BaseConfigurator)
        }
        
        if (isset(app)) {
            this.for(app as Application);
        }
    }

    /**
     * Set the application that must be configured
     *
     * @param {Application} app
     *
     * @return {this}
     */
    public for(app: Application): this {
        this.app = app;

        return this;
    }
    
    /**
     * Add "core" bindings to be registered
     *
     * @param {(Binding | BindingTuple)[]} bindings
     *
     * @return {this}
     */
    public withBindings(bindings: (Binding | BindingTuple)[]): this
    {
        this.bindings = this.bindings.concat(bindings);
        
        return this;
    }

    /**
     * Add "core" shared bindings to be registered
     *
     * @param {(Binding | BindingTuple)[]} bindings
     *
     * @return {this}
     */
    public withSingletons(bindings: (Binding | BindingTuple)[]): this
    {
        this.singletons = this.singletons.concat(bindings);
        
        return this;
    }

    /**
     * Add "core" existing object instances to be registered as shared bindings
     *
     * @param {IdentifierInstanceTuple[]} instances
     *
     * @returns {this}
     */
    public withInstances(instances: IdentifierInstanceTuple[]): this
    {
        this.instances = this.instances.concat(instances);
        
        return this;
    }

    /**
     * Add "core" aliases to be registered
     *
     * @param {IdentifierAliasTuple[]} aliases
     *
     * @return {this}
     */
    public withAliases(aliases: IdentifierAliasTuple[]): this
    {
        return this;
    }
    
    /**
     * Add "core" bootstrappers that application must use
     *
     * @param {BootstrapperConstructor[]} bootstrappers
     *
     * @returns {this}
     */
    public withBootstrappers(bootstrappers: BootstrapperConstructor[]): this
    {
        this.bootstrappers = this.bootstrappers.concat(bootstrappers);
        
        return this;
    }

    /**
     * Add "core" service providers to be registered by the application
     *
     * @param {(ServiceProvider | ServiceProviderConstructor)[]} providers
     *
     * @returns {this}
     */
    public withServiceProviders(providers: (ServiceProvider | ServiceProviderConstructor)[]): this
    {
        this.providers = this.providers.concat(providers);
        
        return this;
    }

    /**
     * Applies setup and configuration of the application and returns it
     *
     * @returns {Application}
     */
    public apply(): Application {
        // TODO: Implement this...
        throw new Error("Method not implemented.");
    }
}