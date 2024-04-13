import type {
    Registrar,
    ServiceProvider,
    ServiceProviderConstructor
} from "@aedart/contracts/support/services";
import type { Application } from "@aedart/contracts/core";
import type { ConstructorLike } from "@aedart/contracts";
import RegistrationError from "./exceptions/RegistrationError";
import { isServiceProvider } from "./isServiceProvider";
import { isServiceProviderConstructor } from "./isServiceProviderConstructor";
import { getNameOrDesc } from "@aedart/support/reflections";

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
    public register(provider: ServiceProvider | ServiceProviderConstructor, boot?: boolean): Promise<boolean>
    {
        // TODO:
        return Promise.resolve(false);
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
    public registerMultiple(providers: (ServiceProvider | ServiceProviderConstructor)[], boot?: boolean, safe?: boolean): Promise<boolean>
    {
        // TODO:
        return Promise.resolve(false);
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
        // TODO:
        return false;
    }

    /**
     * Get the service providers that are registered
     *
     * @returns {ServiceProvider[]}
     */
    public get registered(): ServiceProvider[]
    {
        // TODO: 
        return [];
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
    public boot(provider: ServiceProvider): Promise<boolean>
    {
        // TODO:
        return Promise.resolve(false);
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
    public bootMultiple(providers: ServiceProvider[]): Promise<boolean>
    {
        // TODO:
        return Promise.resolve(false);
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
        // TODO:
        return false;
    }

    /**
     * Get the service providers that have been booted
     *
     * @returns {ServiceProvider[]}
     */
    public get booted(): ServiceProvider[]
    {
        // TODO:
        return [];
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
        if (isServiceProvider(provider)) {
            return provider as ServiceProvider;
        }
        
        if (isServiceProviderConstructor(provider)) {
            return new (provider as ServiceProviderConstructor)(this.app);
        }

        const msg = `Unable to resolve service provider: ${getNameOrDesc(provider as ConstructorLike)} is not a valid service provider`;
        throw new RegistrationError(msg, { cause: { provider: provider } });
    }
}