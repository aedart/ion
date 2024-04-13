import type {
    Registrar,
    ServiceProvider,
    ServiceProviderConstructor
} from "@aedart/contracts/support/services";
import type { Application } from "@aedart/contracts/core";
import type { ConstructorLike } from "@aedart/contracts";
import { getNameOrDesc } from "@aedart/support/reflections";
import { getErrorMessage } from "@aedart/support/exceptions";
import BootError from "./exceptions/BootError";
import RegistrationError from "./exceptions/RegistrationError";
import { isServiceProvider } from "./isServiceProvider";
import { isServiceProviderConstructor } from "./isServiceProviderConstructor";

/**
 * Service Registrar
 */
export default class ServiceRegistrar implements Registrar
{
    /**
     * The application instance used by this registrar
     * 
     * @type {Application}
     * 
     * @protected
     */
    protected app: Application;

    /**
     * The registered service providers
     * 
     * @type {Set<ServiceProvider>}
     * 
     * @protected
     */
    protected registeredProviders: Set<ServiceProvider> = new Set();

    /**
     * Booted service providers
     * 
     * @type {WeakSet<ServiceProvider>}
     * 
     * @protected
     */
    protected bootedProviders: WeakSet<ServiceProvider> = new WeakSet();
    
    /**
     * Create a new Service Registrar instance
     * 
     * @param {Application} app
     */
    constructor(app: Application)
    {
        this.app = app;
    }
    
    /**
     * Register a service provider
     *
     * @param {ServiceProvider | ServiceProviderConstructor} provider
     * @param {boolean} [boot=true]
     *
     * @returns {Promise<boolean>} False if already registered
     *
     * @async
     */
    public async register(provider: ServiceProvider | ServiceProviderConstructor, boot: boolean = true): Promise<boolean>
    {
        if (this.isRegistered(provider)) {
            return Promise.resolve(false); 
        }
        
        // Resolve and register provider
        provider = this.resolveProvider(provider);
        this.performRegistration(provider);
        
        // Boot if required
        if (boot) {
            await this.boot(provider);
        }

        return Promise.resolve(true);
    }

    /**
     * Register multiple service providers
     *
     * **Note**: _Method skips providers that have already been registered!_
     *
     * @param {(ServiceProvider | ServiceProviderConstructor)[]} providers
     * @param {boolean} [boot=true]
     * @param {boolean} [safe=true] If true, given providers are only booted after all providers have been registered.
     *
     * @returns {Promise<boolean>}
     *
     * @async
     */
    public async registerMultiple(
        providers: (ServiceProvider | ServiceProviderConstructor)[],
        boot: boolean = true,
        safe: boolean = true
    ): Promise<boolean>
    {
        // Determine if provider should be booted immediately.
        const bootImmediately: boolean = boot && !safe;
        
        for (const provider of providers) {
            await this.register(provider, bootImmediately);
        }
        
        // When requested booted safely, all registered providers must be
        // attempted booted, because given providers could just be class
        // constructors, and not provider instances!
        if (boot && safe) {
            await this.bootMultiple(this.registered);
        }

        return Promise.resolve(true);
    }

    /**
     * Determine if service provider has already been registered
     *
     * @param {ServiceProvider | ServiceProviderConstructor} provider
     *
     * @returns {boolean}
     */
    public isRegistered(provider: ServiceProvider | ServiceProviderConstructor): boolean
    {
        if (this.isServiceProvider(provider)) {
            return this.registeredProviders.has(provider as ServiceProvider);
        }

        if (!this.isServiceProviderConstructor(provider)) {
            return false;
        }
        
        for (const registered of this.registeredProviders) {
            if (registered instanceof (provider as ConstructorLike)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the service providers that are registered
     *
     * @returns {ServiceProvider[]}
     */
    public get registered(): ServiceProvider[]
    {
        return Array.from(this.registeredProviders);
    }

    /**
     * Boot given service provider
     *
     * @param {ServiceProvider} provider
     *
     * @returns {Promise<boolean>} False if provider has already been booted
     *
     * @async
     */
    public async boot(provider: ServiceProvider): Promise<boolean>
    {
        if (this.hasBooted(provider)) {
            return Promise.resolve(false);
        }

        // TODO: start boot timeout? Fail if timeout exceeded?
        
        let wasBooted = false;
        
        try {

            // TODO: Call "before" boot callbacks (booting)?
            
            wasBooted = await provider.boot();

            // TODO: Call "after" boot callbacks (booted)?
        } catch (e) {
            const reason: string = getErrorMessage(e);
            const msg: string = `Unable to boot provider ${getNameOrDesc(provider.constructor as ConstructorLike)}: ${reason}`;
            throw new BootError(msg, { cause: { provider: provider, previous: e } });
        }

        if (wasBooted) {
            this.markAsBooted(provider);
        }

        // TODO: Clear timeout?
        
        return Promise.resolve(wasBooted);
    }

    /**
     * Boots all given service providers
     *
     * **Note**: _Method skips providers that have already been booted!_
     *
     * @param {ServiceProvider[]} providers
     *
     * @returns {Promise<boolean>}
     *
     * @async
     */
    public async bootMultiple(providers: ServiceProvider[]): Promise<boolean>
    {
        for (const provider of providers) {
            await this.boot(provider);
        }
        
        return Promise.resolve(true);
    }

    /**
     * Boot all registered service providers
     *
     * **Note**: _Method skips providers that have already been booted!_
     *
     * @returns {Promise<boolean>}
     */
    public async bootAll(): Promise<boolean>
    {
        return this.bootMultiple(this.registered);
    }
    
    /**
     * Determine if service provider has already been booted
     *
     * @param {ServiceProvider} provider
     *
     * @returns {boolean}
     */
    public hasBooted(provider: ServiceProvider): boolean
    {
        return this.bootedProviders.has(provider);
    }

    /**
     * Get the service providers that have been booted
     *
     * @returns {ServiceProvider[]}
     */
    public get booted(): ServiceProvider[]
    {
        const registered = this.registered;
        
        return registered.filter((provider: ServiceProvider) => {
            return this.hasBooted(provider);
        });
    }

    /**
     * Resolves service provider
     *
     * @param {ServiceProvider | ServiceProviderConstructor} provider
     *
     * @returns {ServiceProvider} Resolved service provider instance
     *
     * @throws {RegistrationException}
     */
    public resolveProvider(provider: ServiceProvider | ServiceProviderConstructor): ServiceProvider
    {
        if (this.isServiceProvider(provider)) {
            return provider as ServiceProvider;
        }
        
        if (this.isServiceProviderConstructor(provider)) {
            return new (provider as ServiceProviderConstructor)(this.app);
        }

        const msg = `Unable to resolve service provider: ${getNameOrDesc(provider as ConstructorLike)} is not a valid service provider`;
        throw new RegistrationError(msg, { cause: { provider: provider } });
    }

    /**
     * Performs registration of given service provider
     * 
     * @param {ServiceProvider} provider
     * 
     * @return {void}
     *
     * @throws {RegistrationError}
     * 
     * @protected
     */
    protected performRegistration(provider: ServiceProvider): void
    {
        try {
            provider.register();
        } catch (e) {
            const reason: string = getErrorMessage(e);
            const msg: string = `Unable to register provider ${getNameOrDesc(provider.constructor as ConstructorLike)}: ${reason}`; 
            throw new RegistrationError(msg, { cause: { provider: provider, previous: e } });
        }

        this.markAsRegistered(provider);
    }

    /**
     * Mark service provider as "registered"
     * 
     * @param {ServiceProvider} provider
     * 
     * @return {void}
     * 
     * @protected
     */
    protected markAsRegistered(provider: ServiceProvider): void
    {
        this.registeredProviders.add(provider);
    }

    /**
     * Mark service provider as "booted"
     * 
     * @param {ServiceProvider} provider
     * 
     * @return {void}
     * 
     * @protected
     */
    protected markAsBooted(provider: ServiceProvider): void
    {
        this.bootedProviders.add(provider);
    }
    
    /**
     * Determine if instance is a service provider
     * 
     * @param {object} instance
     * 
     * @returns {boolean}
     * 
     * @protected
     */
    protected isServiceProvider(instance: object): boolean
    {
        return isServiceProvider(instance);
    }

    /**
     * Determine if target is a service provider class constructor
     * 
     * @param {any} target
     * 
     * @returns {boolean}
     * 
     * @protected
     */
    protected isServiceProviderConstructor(
        target: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): boolean
    {
        return isServiceProviderConstructor(target);
    }
}