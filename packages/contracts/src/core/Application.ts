import {
    Callback,
    ClassMethodReference
} from "@aedart/contracts";
import { Container } from "@aedart/contracts/container";
import { CallbackWrapper } from "@aedart/contracts/support";
import {
    Registrar,
    ServiceProvider,
    ServiceProviderConstructor
} from "@aedart/contracts/support/services";
import {
    BootCallback,
    TerminationCallback
} from "./types";
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
     * This core application's current version
     * 
     * @type {string}
     */
    get version(): string;

    /**
     * The Service Registrar used by this application
     * 
     * @type {Registrar}
     */
    get registrar(): Registrar;
    
    // TODO: Application Environment ???

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
     * @returns {Promise<boolean>}
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
     * **Note**: _Method will bootstrap application's bootstrappers and boot
     * the registered service providers. It does nothing if the application is
     * already running._
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
}