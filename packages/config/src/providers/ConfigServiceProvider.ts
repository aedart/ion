import { CONFIG } from "@aedart/contracts/config";
import { ServiceProvider } from "@aedart/support/services";
import Repository from '../Repository';

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
            .alias(CONFIG, 'config');
    }
}