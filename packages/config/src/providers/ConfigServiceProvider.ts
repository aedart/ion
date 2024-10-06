import { CONFIG, CONFIG_RESOLVER } from "@aedart/contracts/config";
import { ServiceProvider } from "@aedart/support/services";
import Repository from '../Repository';
import Resolver from '../resolvers/DefaultResolver';

/**
 * Configuration Service Provider
 */
export default class ConfigServiceProvider extends ServiceProvider
{
    /**
     * @inheritdoc
     */
    public register(): void
    {
        this.app
            .singleton(CONFIG, Repository)
            .alias(CONFIG, 'config')

            .singleton(CONFIG_RESOLVER, Resolver);
    }
}