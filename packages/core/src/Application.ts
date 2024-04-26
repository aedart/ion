import {
    Callback,
    ClassMethodReference
} from "@aedart/contracts";
import type {
    Application as ApplicationContract,
    BootstrapperConstructor,
    BootCallback,
    TerminationCallback
} from "@aedart/contracts/core";
import { CallbackWrapper } from "@aedart/contracts/support";
import { Container } from "@aedart/container";
import { CORE } from "@aedart/contracts/core";
import { CONTAINER } from "@aedart/contracts/container";
import type {
    Registrar,
    ServiceProvider,
    ServiceProviderConstructor
} from "@aedart/contracts/support/services";
import { version } from "../package.json";

/**
 * Core Application
 * 
 * Adaptation of Laravel's Foundation `Application`.
 * 
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Foundation/Application.php
 */
export default class Application extends Container implements ApplicationContract
{
    /**
     * Returns the singleton instance of the core application
     *
     * @return {ApplicationContract|this}
     */
    public static getInstance(): ApplicationContract
    {
        return super.getInstance() as ApplicationContract;
    }

    /**
     * Set the singleton instance of the core application
     *
     * @param {ApplicationContract | null} [container]
     *
     * @return {ApplicationContract | null}
     */
    public static setInstance(container: ApplicationContract | null = null): ApplicationContract | null
    {
        const application = super.setInstance(container) as ApplicationContract | null;

        // Register core application bindings
        if (application !== null) {
            application.instance(CORE, this);
            application.alias(CORE, CONTAINER);
        }

        return application;
    }

    /**
     * This core application's current version
     *
     * @type {string}
     */
    get version(): string
    {
        return version;
    }

    /**
     * The Service Registrar used by this application
     *
     * @type {Registrar}
     */
    public get registrar(): Registrar
    {
        // TODO: Implement this...
        return {} as Registrar;
    }

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
    public async register(provider: ServiceProvider | ServiceProviderConstructor): Promise<boolean>
    {
        // TODO: Implement this...
        return Promise.resolve(false);
    }

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
    public async registerMultiple(providers: (ServiceProvider | ServiceProviderConstructor)[]): Promise<boolean>
    {
        // TODO: Implement this...
        return Promise.resolve(false);
    }

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
    public bootstrapWith(bootstrappers: BootstrapperConstructor[]): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Determine if application has been bootstrapped
     *
     * @return {boolean}
     */
    public hasBeenBootstrapped(): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Boot this application's service providers
     *
     * @returns {Promise<boolean>}
     *
     * @async
     */
    public async boot(): Promise<boolean>
    {
        // TODO: Implement this...
        return Promise.resolve(false);
    }

    /**
     * Determine if application has booted
     *
     * @see boot
     *
     * @return {boolean}
     */
    public hasBooted(): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Register a callback to be invoked before this application boots
     *
     * @param {BootCallback} callback
     *
     * @return {this}
     */
    public before(callback: BootCallback): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Register a callback to be invoked after this application has booted
     *
     * @param {BootCallback} callback
     *
     * @return {this}
     */
    public after(callback: BootCallback): this
    {
        // TODO: Implement this...
        return this;
    }

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
    public async run(callback?: Callback | CallbackWrapper | ClassMethodReference): Promise<boolean>
    {
        // TODO: Implement this...
        return Promise.resolve(false);
    }

    /**
     * Determine if application is running
     *
     * @return {boolean}
     */
    public isRunning(): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Terminate this application
     *
     * @return {void}
     */
    public terminate(): void
    {
        // TODO: Implement this...
    }

    /**
     * Register a callback to be invoked when the application is terminating
     *
     * @param {TerminationCallback} callback
     *
     * @return {this}
     */
    public terminating(callback: TerminationCallback): this
    {
        // TODO: Implement this...
        return this;
    }
}