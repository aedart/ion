import { Callback, ClassMethodReference } from "@aedart/contracts";
import { CallbackWrapper } from "@aedart/contracts/support";

/**
 * Service Provider
 * 
 * Adaptation of Laravel's Service Provider
 * 
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Support/ServiceProvider.php
 */
export default interface ServiceProvider
{
    /**
     * Register application services
     * 
     * @return {void}
     */
    register(): void;

    /**
     * Boot this service provider
     * 
     * @returns {Promise<boolean>}
     * 
     * @async
     */
    boot(): Promise<boolean>;
    
    /**
     * Register a callback to be invoked just before this service provider is booted
     * 
     * @param {Callback | CallbackWrapper | ClassMethodReference} callback
     * 
     * @return {this}
     */
    before(callback: Callback | CallbackWrapper | ClassMethodReference): this;

    /**
     * Register a callback to be invoked after this service provider has booted
     *
     * @param {Callback | CallbackWrapper | ClassMethodReference} callback
     *
     * @return {this}
     */
    after(callback: Callback | CallbackWrapper | ClassMethodReference): this;

    /**
     * Invokes all registered "before" boot callbacks
     * 
     * @return {void}
     */
    callBeforeCallbacks(): void;

    /**
     * Invokes all registered "after" boot callbacks
     *
     * @return {void}
     */
    callAfterCallbacks(): void;
}