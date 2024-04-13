import ServiceProvider from "./ServiceProvider";
import ServiceProviderConstructor from "./ServiceProviderConstructor";

/**
 * Service Registrar
 * 
 * Able to register and boot service providers.
 */
export default interface Registrar
{
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
    register(provider: ServiceProvider | ServiceProviderConstructor, boot?: boolean): Promise<boolean>;

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
    registerMultiple(providers: (ServiceProvider | ServiceProviderConstructor)[], boot?: boolean, safe?: boolean): Promise<boolean>;

    /**
     * Determine if service provider has already been registered
     * 
     * @param {ServiceProvider | ServiceProviderConstructor} provider
     * 
     * @returns {boolean}
     */
    isRegistered(provider: ServiceProvider | ServiceProviderConstructor): boolean

    /**
     * Get the service providers that are registered
     * 
     * @returns {ServiceProvider[]}
     */
    get registered(): ServiceProvider[];

    /**
     * Boot given service provider
     * 
     * @param {ServiceProvider} provider
     * 
     * @returns {Promise<boolean>} False if provider has already been booted
     * 
     * @async
     */
    boot(provider: ServiceProvider): Promise<boolean>;

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
    bootMultiple(providers: ServiceProvider[]): Promise<boolean>;

    /**
     * Boot all registered service providers
     *
     * **Note**: _Method skips providers that have already been booted!_
     * 
     * @returns {Promise<boolean>}
     */
    bootAll(): Promise<boolean>;
    
    /**
     * Determine if service provider has already been booted
     * 
     * @param {ServiceProvider} provider
     * 
     * @returns {boolean}
     */
    hasBooted(provider: ServiceProvider): boolean;

    /**
     * Get the service providers that have been booted
     * 
     * @returns {ServiceProvider[]}
     */
    get booted(): ServiceProvider[];

    /**
     * Resolves service provider
     * 
     * @param {ServiceProvider | ServiceProviderConstructor} provider
     * 
     * @returns {ServiceProvider} Resolved service provider instance
     * 
     * @throws {RegistrationException}
     */
    resolveProvider(provider: ServiceProvider | ServiceProviderConstructor): ServiceProvider;
}