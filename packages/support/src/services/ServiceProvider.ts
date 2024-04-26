import type { ServiceProvider as ServiceProviderContract } from "@aedart/contracts/support/services";
import type { Application } from "@aedart/contracts/core";
import type { Callback, ClassMethodReference } from "@aedart/contracts";
import type { CallbackWrapper } from "@aedart/contracts/support";

/**
 * Service Provider
 * 
 * An adaptation of Laravel's Service Provider
 * 
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Support/ServiceProvider.php
 */
export default abstract class ServiceProvider implements ServiceProviderContract
{
    /**
     * The core application instance, or service container
     * 
     * @type {Application}
     * 
     * @protected
     */
    protected app: Application;

    /**
     * Callbacks to be invoked before this service provider boots
     * 
     * @type {(Callback | CallbackWrapper | ClassMethodReference)[]}
     * 
     * @protected
     */
    protected beforeBootCallbacks: (Callback | CallbackWrapper | ClassMethodReference)[] = [];

    /**
     * Callbacks to be invoked after this service provider has booted
     *
     * @type {(Callback | CallbackWrapper | ClassMethodReference)[]}
     *
     * @protected
     */
    protected afterBootCallbacks: (Callback | CallbackWrapper | ClassMethodReference)[] = [];
    
    /**
     * Create a new instance of this Service Provider
     * 
     * @param {Application} app
     */
    public constructor(app: Application)
    {
        this.app = app;
    }

    /**
     * Register application services
     *
     * @return {void}
     */
    public register(): void
    {
        // Overwrite this method to register services...
    }

    /**
     * Boot this service provider
     *
     * @returns {Promise<boolean>}
     *
     * @async
     */
    public async boot(): Promise<boolean>
    {
        // Overwrite this method to perform boot logic...
        
        return Promise.resolve(true);
    }

    /**
     * Register a callback to be invoked just before this service provider is booted
     *
     * @param {Callback | CallbackWrapper | ClassMethodReference} callback
     *
     * @return {this}
     */
    public before(callback: Callback | CallbackWrapper | ClassMethodReference): this
    {
        this.beforeBootCallbacks.push(callback);
        
        return this;
    }

    /**
     * Register a callback to be invoked after this service provider has booted
     *
     * @param {Callback | CallbackWrapper | ClassMethodReference} callback
     *
     * @return {this}
     */
    public after(callback: Callback | CallbackWrapper | ClassMethodReference): this
    {
        this.afterBootCallbacks.push(callback);
        
        return this;
    }

    /**
     * Invokes all registered "before" boot callbacks
     *
     * @return {void}
     */
    public callBeforeCallbacks(): void
    {
        this.callCallbacks(this.beforeBootCallbacks);
    }

    /**
     * Invokes all registered "after" boot callbacks
     *
     * @return {void}
     */
    public callAfterCallbacks(): void
    {
        this.callCallbacks(this.afterBootCallbacks);
    }

    /**
     * Invokes given callbacks
     * 
     * @param {(Callback | CallbackWrapper | ClassMethodReference)[]} callbacks
     * 
     * @return {void}
     * 
     * @protected
     */
    protected callCallbacks(callbacks: (Callback | CallbackWrapper | ClassMethodReference)[]): void
    {
        for (const callback of callbacks) {
            this.app.call(callback);
        }
    }
}