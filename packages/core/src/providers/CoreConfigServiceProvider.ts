import { ConfigServiceProvider } from "@aedart/config";
import { CONFIG_SOURCE } from "@aedart/contracts/core";
import type { Items, Source, Resolver, Repository } from "@aedart/contracts/config";
import { CONFIG, CONFIG_RESOLVER } from "@aedart/contracts/config";

/**
 * Core Config Service Provider
 * 
 * @see {ConfigServiceProvider}
 */
export default class CoreConfigServiceProvider extends ConfigServiceProvider
{
    /**
     * Ensures that configuration {@link Items} are resolved from
     * registered (bound) {@link Source}.
     *
     * @returns {Promise<boolean>}
     *
     * @async
     */
    public async boot(): Promise<boolean>
    {
        // Skip if no configuration source was bound.
        if (!this.app.bound(CONFIG_SOURCE)) {
            return Promise.resolve(true);    
        }
        
        const source: Source = this.app.get<Source>(CONFIG_SOURCE);
        const resolver: Resolver = this.app.get<Resolver>(CONFIG_RESOLVER);
        const repository: Repository = this.app.get<Repository>(CONFIG);

        // Resolve the items and populate the application's configuration repository.
        const items: Items = await resolver.resolve(source);
        repository.merge(items);
        
        // Unbind the configuration source from the application. There should be no
        // need to keep it in memory, at this point.
        this.app.forget(CONFIG_SOURCE);

        return Promise.resolve(true);
    }
}