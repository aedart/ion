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
}