import {
    Callback,
    ClassMethodReference
} from "@aedart/contracts";
import { Container } from "@aedart/contracts/container";
import { CallbackWrapper } from "@aedart/contracts/support";
import {
    Registrar,
    ServiceProvider,
    ServiceProviderConstructor,
    BootException,
} from "@aedart/contracts/support/services";
import {
    DetectEnvironmentCallback,
    BootCallback,
    TerminationCallback,
    DestroyCallback
} from "./types";
import Configurator from "./configuration/Configurator";
import ConfiguratorConstructor from "./configuration/ConfiguratorConstructor";
import BootstrapperConstructor from "./BootstrapperConstructor";

/**
 * Core Application
 *
 * Adaptation of Laravel's Foundation `Application` interface.
 *
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Contracts/Foundation/Application.php
 */
export default interface Application extends Container
{
    /**
     * Configure this application using given configurator
     *
     * @param {Configurator | ConfiguratorConstructor} [configurator] If no configurator is given, then
     *                                                  a default configurator is applied.
     * 
     * @return {this}
     * 
     * @throws {ConfigurationException}
     */
    configure(configurator?: Configurator | ConfiguratorConstructor): this;
    
    /**
     * This core application's current version
     * 
     * @type {string}
     */
    get version(): string;

    /**
     * Determine if application is in the local environment
     * 
     * @return {boolean}
     */
    isLocal(): boolean;

    /**
     * Determine if application is in the production environment
     *
     * @return {boolean}
     */
    isProduction(): boolean;

    /**
     * Determine if application is in a testing environment
     *
     * @return {boolean}
     */
    isTesting(): boolean;

    /**
     * Determine if application's environment matches either of the given
     * 
     * @param {...string} environment
     * 
     * @return {boolean}
     */
    isEnvironment(...environment: string[]): boolean;
    
    /**
     * The current application's environment
     * 
     * @type {string}
     */
    get environment(): string;

    /**
     * Detect and return the current application's environment
     * 
     * @param {DetectEnvironmentCallback} [callback] If no callback is given, then a default
     *                                              detection callback is used.
     * 
     * @return {string}
     */
    detectEnvironment(callback?: DetectEnvironmentCallback): string;

    /**
     * The Service Registrar used by this application
     *
     * @type {Registrar}
     */
    get registrar(): Registrar;

    /**
     * Register a service provider
     *
     * @param {ServiceProvider | ServiceProviderConstructor} provider
     *
     * @returns {Promise<boolean>} False if already registered
     *
     * @async
     */
    register(provider: ServiceProvider | ServiceProviderConstructor): Promise<boolean>;

    /**
     * Register multiple service providers
     *
     * **Note**: _Method skips providers that have already been registered!_
     *
     * @param {(ServiceProvider | ServiceProviderConstructor)[]} providers
     *
     * @returns {Promise<boolean>}
     *
     * @async
     */
    registerMultiple(providers: (ServiceProvider | ServiceProviderConstructor)[]): Promise<boolean>;

    /**
     * Run given application bootstrappers
     * 
     * **Note**: _Method does nothing if application has already
     * been bootstrapped._
     * 
     * @see hasBeenBootstrapped
     * 
     * @param {BootstrapperConstructor[]} bootstrappers
     * 
     * @return {this}
     */
    bootstrapWith(bootstrappers: BootstrapperConstructor[]): this;

    /**
     * Determine if application has been bootstrapped
     * 
     * @return {boolean}
     */
    hasBeenBootstrapped(): boolean;
    
    /**
     * Boot this application's service providers
     *
     * **Note**: _The application cannot be booted, if it has not yet been
     * [bootstrapped]{@link hasBeenBootstrapped}._
     * 
     * @returns {Promise<boolean>}
     *
     * @throws {BootException}
     * 
     * @async
     */
    boot(): Promise<boolean>;

    /**
     * Determine if application has booted
     * 
     * @see boot
     * 
     * @return {boolean}
     */
    hasBooted(): boolean;

    /**
     * Register a callback to be invoked before this application boots
     * 
     * @param {BootCallback} callback
     * 
     * @return {this}
     */
    before(callback: BootCallback): this;

    /**
     * Register a callback to be invoked after this application has booted
     *
     * @param {BootCallback} callback
     *
     * @return {this}
     */
    after(callback: BootCallback): this;

    /**
     * Run this application
     * 
     * **Note**: _Method will automatically bootstrap and boot the application, if not
     * already bootstrapped and booted._
     *
     * **Note**: _Method will do nothing, if the application is already running._
     * 
     * @param {Callback | CallbackWrapper | ClassMethodReference} [callback] Invoked after bootstrapping and booting has completed
     * 
     * @return {Promise<boolean>}
     * 
     * @async
     */
    run(callback?: Callback | CallbackWrapper | ClassMethodReference): Promise<boolean>;

    /**
     * Determine if application is running
     * 
     * @return {boolean}
     */
    isRunning(): boolean;

    /**
     * Terminate this application
     * 
     * **Note**: _Method will reset the {@link isRunning} state of this application.
     * However, the application still remains in a [bootstrapped]{@link hasBeenBootstrapped}
     * and [booted]{@link hasBooted} state. Call {@link destroy} to completely destroy
     * this application's bootstrap and boot state, as well as registered bindings._
     * 
     * @see destroy
     * 
     * @return {Promise<boolean>}
     *
     * @async
     */
    terminate(): Promise<boolean>;

    /**
     * Register a callback to be invoked when the application is terminating
     * 
     * @param {TerminationCallback} callback
     * 
     * @return {this}
     */
    terminating(callback: TerminationCallback): this;

    /**
     * Destroy this application instance
     * 
     * **Note**: _Method resets this application's [bootstrapped]{@link hasBeenBootstrapped}
     * and [booted]{@link hasBooted} states, [flushes]{@link flush} registered bindings
     * and resolved instances, and other vital properties._
     * 
     * @return {void}
     */
    destroy(): void;

    /**
     * Register a callback to be invoked just before the application is destroyed
     * 
     * @param {DestroyCallback} callback
     * 
     * @returns {this}
     */
    destroying(callback: DestroyCallback): this;
}