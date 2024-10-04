import type { Items, Path } from "@aedart/contracts/config";
import { getErrorMessage } from "@aedart/support/exceptions";
import BaseLoader from './BaseLoader';
import LoaderError from '../exceptions/LoaderError';

/**
 * Path (module) Loader
 * 
 * @see {BaseLoader}
 */
export default class PathLoader extends BaseLoader
{
    /**
     * Path (module-name) to configuration items module
     *
     * @type {Path}
     *
     * @protected
     */
    protected path: Path;

    /**
     * Create new Configuration Loader instance
     *
     * @param {Path} path
     */
    public constructor(path: Path)
    {
        super(path);

        this.path = path;
    }

    /**
     * Load configuration {@link Items}
     *
     * @return {Promise<Items>}
     *
     * @throws {import('@aedart/contracts/config').LoaderException}
     */
    public async load(): Promise<Items>
    {
        try {
            const module = await import(this.path);

            return module?.default;
        } catch (e) {
            const reason: string = getErrorMessage(e);
            throw new LoaderError(`Unable to load configuration items: ${reason}`, { cause: { path: this.path, previous: e } });
        }
    }
}