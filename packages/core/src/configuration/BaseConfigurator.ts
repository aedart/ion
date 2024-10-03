import type {
    Application,
    BootstrapperConstructor,
    Configurator
} from "@aedart/contracts/core";
import type {
    ServiceProvider,
    ServiceProviderConstructor
} from "@aedart/contracts/support/services";
import type {
    BindingTuple,
    IdentifierAliasTuple,
    IdentifierInstanceTuple
} from "@aedart/contracts/container";
import type { Repository } from "@aedart/contracts/config";
import { CONFIG } from "@aedart/contracts/config";
import { AbstractClassError } from "@aedart/support/exceptions";
import { isset } from "@aedart/support/misc";
import { shallowMerge } from "@aedart/support/objects";
import ConfigurationError from "../exceptions/ConfigurationError";

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
     * Configuration items for the application
     * 
     * @type {Record<PropertyKey, any>}
     * 
     * @protected
     */
    protected configurationItems: Record<PropertyKey, any> = {};
    
    /**
     * List of bindings to be registered
     * 
     * @type {BindingTuple[]}
     * 
     * @protected
     */
    protected bindings: BindingTuple[] = [];

    /**
     * List of shared bindings to be registered
     *
     * @type {BindingTuple[]}
     * 
     * @protected
     */
    protected singletons: BindingTuple[] = [];

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
     * Add configuration items for the application
     *
     * @see {import('@aedart/contracts/config').Repository}
     *
     * @param {Record<PropertyKey, any>} items
     *
     * @return {this}
     */
    public with(items: Record<PropertyKey, any>): this /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.configurationItems = shallowMerge(this.configurationItems, items);
        
        return this;
    }
    
    /**
     * Add "core" bindings to be registered
     *
     * @param {BindingTuple[]} bindings
     *
     * @return {this}
     */
    public withBindings(bindings: BindingTuple[]): this
    {
        this.bindings = this.bindings.concat(bindings);
        
        return this;
    }

    /**
     * Add "core" shared bindings to be registered
     *
     * @param {BindingTuple[]} bindings
     *
     * @return {this}
     */
    public withSingletons(bindings: BindingTuple[]): this
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
        this.aliases = this.aliases.concat(aliases);
        
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
     *
     * @throws {ConfigurationException}
     */
    public apply(): Application
    {
        if (!isset(this.app)) {
            throw new ConfigurationError('No application instance has been specified - unable to apply setup and configuration');
        }
        
        this.before(this.app as Application);
        
        this
            .registerInstances()
            .registerSingletons()
            .registerBindings()
            .registerAliases()
            .registerBootstrappers()
            .setConfigurationItems()
            .registerServiceProviders();
        
        this.after(this.app as Application);
        
        return this.app as Application;
    }

    /**
     * "hook" method that is invoked before setup and configuration is applied
     * 
     * @param {Application} app
     * 
     * @return {void}
     */
    public before(app: Application): void
    {
        // Overwrite this method to perform logic before "apply" logic
    }

    /**
     * "hook" method that is invoked after setup and configuration is applied
     *
     * @param {Application} app
     *
     * @return {void}
     */
    public after(app: Application): void
    {
        // Overwrite this method to perform logic after "apply" logic
    }
    
    /**
     * Register the "core" object instances as shared bindings
     * 
     * @return {this}
     * 
     * @protected
     */
    protected registerInstances(): this
    {
        for (const [ identifier, instance ] of this.instances) {
            this.app?.instance(identifier, instance);
        }
        
        return this;
    }

    /**
     * Register "core" shared bindings
     * 
     * @return {this}
     * 
     * @protected
     */
    protected registerSingletons(): this
    {
        for (const [ identifier, concrete ] of this.singletons) {
            this.app?.singleton(identifier, concrete);
        }
        
        return this;
    }

    /**
     * Register "core" bindings
     * 
     * @return {this}
     * 
     * @protected
     */
    protected registerBindings(): this
    {
        for (const [ identifier, concrete, shared ] of this.bindings) {
            this.app?.bind(identifier, concrete, shared);
        }
        
        return this;
    }

    /**
     * Register "core" binding aliases
     * 
     * @return {this}
     * 
     * @protected
     */
    protected registerAliases(): this
    {
        for (const [ identifier, alias ] of this.aliases) {
            this.app?.alias(identifier, alias);
        }
        
        return this;
    }

    /**
     * Register "core" bootstrappers
     * 
     * @return {this}
     * 
     * @protected
     */
    protected registerBootstrappers(): this
    {
        this.app?.withCoreBootstrappers(this.bootstrappers);
        
        return this;
    }

    /**
     * Set the items in the application's [Configuration Repository]{@link import('@aedart/contracts/config').Repository}
     * 
     * @return {this}
     * 
     * @protected
     */
    protected setConfigurationItems(): this
    {
        this.app?.extend(CONFIG, (resolved: Repository) => {
            return resolved.merge(this.configurationItems);
        });

        return this;
    }
    
    /**
     * Register "core" service providers
     * 
     * @return {this}
     * 
     * @protected
     */
    protected registerServiceProviders(): this
    {
        this.app?.registerMultiple(this.providers);
        
        return this;
    }
}