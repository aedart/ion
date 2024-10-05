import type { Items, Path } from "@aedart/contracts/config";
import { getErrorMessage } from "@aedart/support/exceptions";
import BaseLoader from './BaseLoader';
import LoaderError from '../exceptions/LoaderError';

/**
 * @deprecated TODO: Remove this...
 * 
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
            // Warning: depending on what bundler is used, fully dynamic imports might not be supported.
            // This means that `(await import(this.path)).default` cannot work. When using Vite, Webpack,
            // Rollup,...etc., part of the import path must be pre-specified, such that the bundler can
            // perform some static analysis of what file(s) to load.
            //
            // @see https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
            // @see https://vite.dev/guide/features#dynamic-import
            // @see https://rollupjs.org/es-module-syntax/#dynamic-import (see dynamic import vars plugin)
            // @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars

            return (await import(`./config/${this.path}.js`)).default;
        } catch (e) {
            const reason: string = getErrorMessage(e);
            throw new LoaderError(`Unable to load configuration items: ${reason}`, { cause: { path: this.path, previous: e } });
        }
    }
}