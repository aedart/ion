import { Application } from "@aedart/core";
import { ConfigurationLoaderFactory } from "@aedart/config";

/**
 * Returns a new configuration loader factory instance
 * 
 * @param {Application} [app]
 * 
 * @return {import('@aedart/contracts/config').Factory}
 */
export default function makeLoaderFactory(app)
{
    app = app || new Application();
    
    return new ConfigurationLoaderFactory(app);
}