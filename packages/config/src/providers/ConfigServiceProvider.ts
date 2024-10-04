import type { Application } from "@aedart/contracts/core";
import { CONFIG, CONFIG_LOADER_FACTORY } from "@aedart/contracts/config";
import { ServiceProvider } from "@aedart/support/services";
import Repository from '../Repository';
import ConfigurationLoaderFactory from "../loaders/ConfigurationLoaderFactory";

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
        
            .singleton(CONFIG_LOADER_FACTORY, (app) => {
                return new ConfigurationLoaderFactory(app as Application);
            });
    }
}