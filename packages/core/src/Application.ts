import type {
    Callback,
    ClassMethodReference
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
    ConfiguratorConstructor,
    ConfiguratorCallback
} from "@aedart/contracts/core";
import { CallbackWrapper } from "@aedart/contracts/support";
import { Container } from "@aedart/container";
import { APP_ENV } from "@aedart/contracts/core";
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
    isPromise,
    isCallable
} from "@aedart/support/reflections";
import type { Source } from "@aedart/contracts/config";
import { isConfigurator } from "./configuration/isConfigurator";
import { isConfiguratorConstructor } from "./configuration/isConfiguratorConstructor";
import ConfigurationError from "./exceptions/ConfigurationError";
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
     * The "core" bootstrappers.
     *
     * @type {BootstrapperConstructor[]}
     *
     * @protected
     */
    protected bootstrappers: BootstrapperConstructor[] = [];
    
    /**
     * A state about whether this application has been bootstrapped or not.
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected bootstrapped: boolean = false;

    /**
     * The applications booted state
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected booted: boolean = false;
    
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
     * Whether the application is running or not
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected running: boolean = false;

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
        return super.setInstance(container) as ApplicationContract | null;
    }

    /**
     * Prepare this application using the given configuration source.
     *
     * **Note**: _Method is shorthand for [configuring]{@link configure} this application
     * using a default {@link Configurator} with a configuration {@link Source}:_
     *
     * @example
     * const source = {}; // not shown here...
     *
     * // Prepare using configuration source
     * app.prepare(source);
     *
     * // Above is equivalent to:
     * app.configure( (configurator) => configurator.with(...) )
     *
     * @param {Source} using
     *
     * @returns {this}
     *
     * @see {Configurator.with}
     */
    public prepare(using: Source): this
    {
        return this.configure(
            (configurator) => configurator.with(using)
        );
    }
    
    /**
     * Configure this application using given configurator
     *
     * @param {Configurator | ConfiguratorConstructor | ConfiguratorCallback} [configurator] If no configurator is given, then
     *                                                  a default configurator is applied. If a callback is provided, then it
     *                                                  will be given a default configurator instance as argument.
     *
     * @return {this}
     *
     * @throws {ConfigurationException}
     */
    public configure(configurator?: Configurator | ConfiguratorConstructor | ConfiguratorCallback): this
    {
        configurator = this.resolveConfigurator(configurator);

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
     * Add "core" bootstrappers that this application must use when bootstrapping
     *
     * @param {BootstrapperConstructor[]} bootstrappers
     *
     * @return {this}
     */
    public withCoreBootstrappers(bootstrappers: BootstrapperConstructor[]): this
    {
        this.bootstrappers = this.bootstrappers.concat(bootstrappers);
        
        return this;
    }

    /**
     * The "core" bootstrappers of this application
     *
     * @type {BootstrapperConstructor[]}
     */
    public get coreBootstrappers(): BootstrapperConstructor[]
    {
        return this.bootstrappers;
    }
    
    /**
     * Run given application bootstrappers
     *
     * **Note**: _Method does nothing if application has already been bootstrapped._
     *
     * @see hasBootstrapped
     *
     * @param {BootstrapperConstructor[]} bootstrappers
     *
     * @return {this}
     */
    public bootstrap(bootstrappers: BootstrapperConstructor[]): this
    {
        if (this.hasBootstrapped()) {
            return this;
        }
        
        for (const bootstrapper of bootstrappers) {
            this.invokeBootstrapper(this.make(bootstrapper));
        }
        
        this.bootstrapped = true;

        return this;
    }

    /**
     * Determine if application has been bootstrapped
     *
     * @return {boolean}
     */
    public hasBootstrapped(): boolean
    {
        return this.bootstrapped;
    }

    /**
     * Boot this application's service providers
     *
     * **Note**: _The application cannot be booted, if it has not yet been
     * [bootstrapped]{@link hasBootstrapped}._
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
        if (!this.hasBootstrapped()) {
            throw new BootError('Application has not been bootstrapped');
        }
        
        // Skip if already booted
        if (this.hasBooted()) {
            return Promise.resolve(false);
        }
        
        // Invoke "before" boot callbacks
        this.invokeBootCallbacks(this.beforeBootCallbacks);

        this.booted = await this.registrar.bootAll()

        // Invoke "after" boot callbacks
        this.invokeBootCallbacks(this.afterBootCallbacks);

        return Promise.resolve(this.booted);
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
        return this.booted;
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
     * already bootstrapped and booted. The {@link coreBootstrappers} are automatically applied
     * if the application has not been bootstrapped._
     *
     * **Note**: _Method will do nothing, if the application is already running!_
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

        // Bootstrap the application, using the "core" bootstrappers. NOTE: If the
        // application has already been bootstrapped, then this call will do nothing.
        this.bootstrap(this.coreBootstrappers);
        
        // Boot, if not already booted.
        await this.boot();
        
        // Change state
        this.running = true;
        
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
        return this.running;
    }

    /**
     * Terminate this application
     *
     * **Note**: _Method will reset the {@link isRunning} state of this application.
     * However, the application still remains in a [bootstrapped]{@link hasBootstrapped}
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
        
        // Reset state
        this.running = false;
        
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
     * **Note**: _Method resets this application's [bootstrapped]{@link hasBootstrapped}
     * and [booted]{@link hasBooted} states, [flushes]{@link flush} registered bindings
     * and resolved instances, and other vital properties._
     *
     * @return {void}
     */
    public destroy(): void
    {
        // Regardless whether the application has been terminated or not,
        // reset running state.
        this.running = false;
        
        // Invoke the destroy callbacks (in reverse order).
        this.invokeDestroyCallbacks(
            this.destroyCallbacks.toReversed()
        );
        
        // Reset other states.
        this.serviceRegistrar = null; // contains the "hasBooted" state
        this.bootstrapped = false;
        this.booted = false;
        
        // Clear other properties.
        this.bootstrappers = [];
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
     * Invokes given bootstrapper's bootstrap method 
     * 
     * @param {Bootstrapper} bootstrapper
     * 
     * @return {void}
     * 
     * @protected
     */
    protected invokeBootstrapper(bootstrapper: Bootstrapper): void
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
     * @param {Configurator | ConfiguratorConstructor | ConfiguratorCallback} [configurator]
     *
     * @return {Configurator}
     *
     * @throws {ConfigurationException}
     *
     * @protected
     */
    protected resolveConfigurator(configurator?: Configurator | ConfiguratorConstructor | ConfiguratorCallback): Configurator
    {
        configurator = configurator || this.makeDefaultConfigurator();
        
        if (isConfigurator(configurator)) {
            return configurator as Configurator;
        }

        if (isConfiguratorConstructor(configurator)) {
            return new (configurator as ConfiguratorConstructor)();
        }

        if (isCallable(configurator)) {
            return (configurator as ConfiguratorCallback)(this.makeDefaultConfigurator());
        }
        
        throw new ConfigurationError('Invalid application configurator provided', { cause: { configurator: configurator } })
    }
}