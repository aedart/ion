import {
    Callback,
    ClassMethodReference, type ConstructorLike
} from "@aedart/contracts";
import type {
    Application as ApplicationContract,
    Bootstrapper,
    BootstrapperConstructor,
    BootCallback,
    TerminationCallback,
    DetectEnvironmentCallback,
    DestroyCallback,
    Configurator,
    ConfiguratorConstructor
} from "@aedart/contracts/core";
import { CallbackWrapper } from "@aedart/contracts/support";
import { Container } from "@aedart/container";
import {
    CORE,
    APP_ENV
} from "@aedart/contracts/core";
import { CONTAINER } from "@aedart/contracts/container";
import type {
    Registrar,
    ServiceProvider,
    ServiceProviderConstructor
} from "@aedart/contracts/support/services";
import {
    ServiceRegistrar,
    BootError
} from "@aedart/support/services";
import { isset } from "@aedart/support/misc";
import {
    getNameOrDesc,
    isPromise
} from "@aedart/support/reflections";
import { isConfigurator } from "./configuration/isConfigurator";
import { isConfiguratorConstructor } from "./configuration/isConfiguratorConstructor";
import ConfigurationError from "./exceptions/ConfigurationError";
import LoadEnvironmentVariables from "./bootstrap/LoadEnvironmentVariables";
import SetupFacades from "./bootstrap/SetupFacades";
import DefaultConfigurator from './DefaultConfigurator';
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
     * The service registrar used by this application.
     * 
     * @type {Registrar | null}
     * 
     * @protected
     */
    protected serviceRegistrar: Registrar | null = null

    /**
     * A state about whether this application has been bootstrapped or not.
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected hasBootstrapped: boolean = false;

    /**
     * Callbacks to be invoked before application boots
     * 
     * @type {BootCallback[]}
     * 
     * @protected
     */
    protected beforeBootCallbacks: BootCallback[] = [];

    /**
     * Callbacks to be invoked after application has booted
     *
     * @type {BootCallback[]}
     *
     * @protected
     */
    protected afterBootCallbacks: BootCallback[] = [];

    /**
     * Whether this application's "run" method has been invoked or not
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected runTriggered: boolean = false;

    /**
     * Callbacks to be invoked when application terminates
     * 
     * @type {TerminationCallback[]}
     * 
     * @protected
     */
    protected terminationCallbacks: TerminationCallback[] = [];

    /**
     * Callbacks to be invoked just be fore application is destroyed
     * 
     * @type {DestroyCallback[]}
     * 
     * @protected
     */
    protected destroyCallbacks: DestroyCallback[] = [];

    /**
     * @deprecated TODO: Refactor this
     * 
     * The "core" application bootstrappers to be used when no other
     * bootstrappers are specified.
     * 
     * @type {BootstrapperConstructor[]}
     * 
     * @protected
     */
    protected coreDefaultBootstrappers: BootstrapperConstructor[] = [];
    
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

        // Edge-case: when multiple application instances are instantiated (not this singleton instance),
        // the core bootstrappers, e.g. the "SetupFacades", can negatively affect the other instances.
        // To avoid such kind of issues, only this singleton instance is configured to have core
        // bootstrappers, base bindings, core service providers, etc.

        // TODO: Refactor this
        if (application !== null) {
            this.configureInstance(application);
        }

        return application;
    }

    /**
     * @deprecated TODO: Refactor this
     * 
     * Configure the singleton instance of the given application
     * 
     * @param {ApplicationContract} app
     * 
     * @protected
     */
    protected static configureInstance(app: ApplicationContract): void
    {
        app
            /* @ts-expect-error TS2339 methods are available in this implementation */
            .registerBaseBindings()
            .setupCoreBootstrappers();
    }

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
    public configure(configurator?: Configurator | ConfiguratorConstructor): this
    {
        configurator = this.resolveConfigurator(configurator || this.makeDefaultConfigurator());

        return configurator
            .for(this)
            .apply() as this;
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
     * Determine if application is in the local environment
     *
     * @return {boolean}
     */
    public isLocal(): boolean
    {
        return this.isEnvironment('local');
    }

    /**
     * Determine if application is in the production environment
     *
     * @return {boolean}
     */
    public isProduction(): boolean
    {
        return this.isEnvironment('production');
    }

    /**
     * Determine if application is in a testing environment
     *
     * @return {boolean}
     */
    public isTesting(): boolean
    {
        return this.isEnvironment('testing');
    }

    /**
     * Determine if application's environment matches either of the given
     *
     * @param {...string} environment
     *
     * @return {boolean}
     */
    public isEnvironment(...environment: string[]): boolean
    {
        const appEnv = this.environment;
        
        for (const name of environment) {
            if (appEnv === name) {
                return true;
            }
        }

        return false;
    }

    /**
     * The current application's environment
     *
     * @type {string}
     */
    get environment(): string
    {
        return this.makeOrDefault(APP_ENV, [], 'production');
    }

    /**
     * Detect and return the current application's environment
     *
     * @param {DetectEnvironmentCallback} [callback] If no callback is given, then a default
     *                                              detection callback is used.
     *
     * @return {string}
     */
    public detectEnvironment(callback?: DetectEnvironmentCallback): string
    {
        if (!isset(callback)) {
            callback = () => 'production';
        }
        
        return this.singleton(APP_ENV, (app) => {
            return (callback as DetectEnvironmentCallback)(app as ApplicationContract);
        }).environment;
    }
    
    /**
     * The Service Registrar used by this application
     *
     * @type {Registrar}
     */
    public get registrar(): Registrar
    {
        if (!isset(this.serviceRegistrar)) {
            this.serviceRegistrar = this.makeServiceRegistrar();
        }

        return this.serviceRegistrar as Registrar;
    }

    /**
     * @deprecated TODO: Refactor this
     * 
     * This "core" application's default bootstrappers
     */
    public get _coreBootstrappers(): BootstrapperConstructor[]
    {
        // Core bootstrappers are only set automatically for the singleton
        // instance of this application.
        // @see setInstance()
        // @see configureInstance()
        
        return this.coreDefaultBootstrappers;
    }

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
        return this.registrar.register(provider, this.hasBooted());
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
        return this.registrar.registerMultiple(providers, this.hasBooted());
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
        if (this.hasBeenBootstrapped()) {
            return this;
        }
        
        for (const bootstrapper of bootstrappers) {
            this.bootstrap(this.make(bootstrapper));
        }
        
        this.hasBootstrapped = true;

        return this;
    }

    /**
     * Determine if application has been bootstrapped
     *
     * @return {boolean}
     */
    public hasBeenBootstrapped(): boolean
    {
        return this.hasBootstrapped;
    }

    /**
     * Boot this application's service providers
     *
     * **Note**: _The application cannot be booted, if it has not yet been
     * [bootstrapped]{@link hasBeenBootstrapped}._
     *
     * @returns {Promise<boolean>}
     *
     * @throws {BootError}
     *
     * @async
     */
    public async boot(): Promise<boolean>
    {
        // Prevent booting, if application has not yet been bootstrapped
        if (!this.hasBeenBootstrapped()) {
            throw new BootError('Application has not been bootstrapped');
        }
        
        // Skip if already booted
        if (this.hasBooted()) {
            return Promise.resolve(false);
        }
        
        // Invoke "before" boot callbacks
        this.invokeBootCallbacks(this.beforeBootCallbacks);
        
        const booted = await this.registrar.bootAll();

        // Invoke "after" boot callbacks
        this.invokeBootCallbacks(this.afterBootCallbacks);

        return Promise.resolve(booted);
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
        return this.registrar.booted.length > 0;
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
        this.beforeBootCallbacks.push(callback);

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
        this.afterBootCallbacks.push(callback);

        return this;
    }

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
    public async run(callback?: Callback | CallbackWrapper | ClassMethodReference): Promise<boolean>
    {
        // Do nothing if the application is already in a "running" state.
        if (this.isRunning()) {
            return Promise.resolve(false);
        }

        // Bootstrap the application, using the "default" bootstrappers. NOTE: If the
        // application has already been bootstrapped, then this call will do nothing.
        this.bootstrapWith(this._coreBootstrappers);
        
        // Boot, if not already booted.
        await this.boot();
        
        // Change "running" state,...
        this.runTriggered = true;
        
        // If a callback has been provided, invoke it.
        if (isset(callback)) {
            const result = this.call(callback as Callback | CallbackWrapper | ClassMethodReference);
            
            // In case that the call results in a promise, then return it. Otherwise, any evt. return
            // value is just ignored.
            if (isPromise(result)) {
                return result;
            }
        }

        return Promise.resolve(true);
    }

    /**
     * Determine if application is running
     *
     * @return {boolean}
     */
    public isRunning(): boolean
    {
        return this.runTriggered;
    }

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
    public async terminate(): Promise<boolean>
    {
        // Skip termination, if application is not running
        if (!this.isRunning()) {
            return Promise.resolve(false);
        }
        
        // Create a shallow copy of the termination callbacks, in a reversed order.
        // This allows bootstrappers and service providers to register termination logic,
        // such that eventual dependencies are still maintained between them.
        const callbacks = this.terminationCallbacks.toReversed();
        
        for (const callback of callbacks) {
            // Await for terminate logic to complete, before continuing to the next.
            // Eventual resolve value is ignored here...
            await callback(this);
        }
        
        // Reset the "run" state.
        this.runTriggered = false;
        
        return Promise.resolve(true);
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
        this.terminationCallbacks.push(callback);

        return this;
    }

    /**
     * Destroy this application instance
     *
     * **Note**: _Method resets this application's [bootstrapped]{@link hasBeenBootstrapped}
     * and [booted]{@link hasBooted} states, [flushes]{@link flush} registered bindings
     * and resolved instances, and other vital properties._
     *
     * @return {void}
     */
    public destroy(): void
    {
        // Regardless whether the application has been terminated or not,
        // reset the "run" state.
        this.runTriggered = false;
        
        // Invoke the destroy callbacks (in reverse order).
        this.invokeDestroyCallbacks(
            this.destroyCallbacks.toReversed()
        );
        
        // Reset other states.
        this.serviceRegistrar = null; // contains the "hasBooted" state
        this.hasBootstrapped = false;
        
        // Clear other properties.
        this.beforeBootCallbacks = [];
        this.afterBootCallbacks = [];
        this.terminationCallbacks = [];
        this.destroyCallbacks = [];
        this.flush();
        
        // Finally, clear the singleton instance of this application.
        /* @ts-expect-error TS2339 - setInstance is a valid static method */
        this.constructor.setInstance(null);
    }

    /**
     * Register a callback to be invoked just before the application is destroyed
     *
     * @param {DestroyCallback} callback
     *
     * @returns {this}
     */
    public destroying(callback: DestroyCallback): this
    {
        this.destroyCallbacks.push(callback);
        
        return this;
    }

    /**
     * @deprecated TODO: Refactor this
     * 
     * Register the "base" bindings for this application
     *
     * @returns {ApplicationContract | this}
     *
     * @protected
     */
    protected registerBaseBindings(): this
    {
        this.instance(CORE, this);
        this.alias(CORE, CONTAINER);

        return this;
    }

    /**
     * @deprecated TODO: Refactor this
     * 
     * Set the default "core" bootstrappers
     *
     * @returns {ApplicationContract | this}
     *
     * @protected
     */
    protected setupCoreBootstrappers(): this
    {
        this.coreDefaultBootstrappers = [
            LoadEnvironmentVariables,
            SetupFacades
        ];

        return this;
    }

    /**
     * Bootstrap this application using given bootstrapper
     * 
     * @param {Bootstrapper} bootstrapper
     * 
     * @return {void}
     * 
     * @protected
     */
    protected bootstrap(bootstrapper: Bootstrapper): void
    {
        bootstrapper.bootstrap(this);
    }

    /**
     * Invokes given boot callbacks
     *
     * @param {BootCallback[]} callbacks
     *
     * @return {void}
     *
     * @protected
     */
    protected invokeBootCallbacks(callbacks: BootCallback[]): void
    {
        for (const callback of callbacks) {
            callback(this);
        }
    }

    /**
     * Invokes given destroy callbacks
     * 
     * @param {DestroyCallback[]} callbacks
     * 
     * @protected
     */
    protected invokeDestroyCallbacks(callbacks: DestroyCallback[]): void
    {
        for (const callback of callbacks) {
            callback(this);
        }
    }
    
    /**
     * Returns a new service registrar instance
     * 
     * @return {Registrar}
     * 
     * @protected
     */
    protected makeServiceRegistrar(): Registrar
    {
        return new ServiceRegistrar(this);
    }

    /**
     * Returns a new "default" application configurator instance
     * 
     * @return {Configurator}
     * 
     * @protected
     */
    protected makeDefaultConfigurator(): Configurator
    {
        return new DefaultConfigurator(this);
    }

    /**
     * Resolves Application Configurator
     *
     * @param {Configurator | ConfiguratorConstructor} configurator
     *
     * @return {Configurator}
     *
     * @throws {ConfigurationException}
     *
     * @protected
     */
    protected resolveConfigurator(configurator: Configurator | ConfiguratorConstructor): Configurator
    {
        if (isConfigurator(configurator)) {
            return configurator as Configurator;
        }

        if (isConfiguratorConstructor(configurator)) {
            return new (configurator as ConfiguratorConstructor)();
        }

        const msg = `Unable to resolve application configurator: ${getNameOrDesc(configurator as ConstructorLike)} is not a valid configurator`;
        throw new ConfigurationError(msg, { cause: { configurator: configurator } })
    }
}