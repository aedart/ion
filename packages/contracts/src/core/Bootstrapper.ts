import Application from "./Application";

/**
 * Application Bootstrapper
 */
export default interface Bootstrapper
{
    /**
     * Bootstrap given application
     * 
     * @param {Application} app
     * 
     * @return {void}
     */
    bootstrap(app: Application): void
}