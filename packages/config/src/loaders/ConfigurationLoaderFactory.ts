import type { Application } from "@aedart/contracts/core";
import type {
    Factory,
    Loader,
    LoaderConstructor,
    Source
} from '@aedart/contracts/config';
import UnsupportedSourceError from '../exceptions/UnsupportedSourceError';
import ItemsLoader from './ItemsLoader';
import PathLoader from './PathLoader';

/**
 * Configuration Loader Factory
 * 
 * @see {import('@aedart/contracts/config').Factory}
 */
export default class ConfigurationLoaderFactory implements Factory
{
    /**
     * Core Application instance
     * 
     * @type {Application}
     * 
     * @protected
     */
    protected app: Application;

    /**
     * Create a new Configuration Loader Factory instance
     * 
     * @param {Application} app
     */
    public constructor(app: Application) {
        this.app = app;
    }
    
    /**
     * Returns a new configuration loader for given source
     *
     * @param {Source} source
     *
     * @return {Loader}
     *
     * @throws {import('@aedart/contracts/config').UnsupportedSourceException}
     */
    public make(source: Source): Loader
    {
        if (typeof source === 'string') {
            return this.makeLoader(PathLoader, [ source ]);
        }
        
        if (typeof source === 'object') {
            return this.makeLoader(ItemsLoader, [ source ]);
        }
        
        // TODO: ...handle path, loader instance / constructor, callback... etc.
        
        throw new UnsupportedSourceError('Unable to make Configuration Loader for provided source', { cause: { source: source } });
    }

    /**
     * Returns a new configuration loader instance
     * 
     * @param {LoaderConstructor} loader
     * @param {any[]} [args]
     * 
     * @return {Loader}
     * 
     * @protected
     */
    protected makeLoader(loader: LoaderConstructor, args: any[] = []): Loader
    {
        return this.app.make(loader, args);
    }
}