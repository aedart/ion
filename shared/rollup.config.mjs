/*
|--------------------------------------------------------------------------
| Rollup Configuration Utils
|--------------------------------------------------------------------------
|
| Provides helper methods to create rollup configuration, per package.
|
| Inspiration from:
| @see https://github.com/rollup/plugins/blob/master/shared/rollup.config.mjs
*/

import { builtinModules } from 'module';
import typescript from 'rollup-plugin-typescript2';
import fs, {readFileSync} from "fs";

/**
 * Creates a new rollup configuration for given package
 *
 * @param {string|URL} baseDir Base directory of the package
 * @param {string[]} [external] List of external dependencies to exclude.
 *                              Package's dependencies and peer dependencies are automatically
 *                              excluded.
 * @param {string[]} [formats] Output formats, e.g. cjs, es
 * @param {import('rollup').RollupOptions|object} [overwrites]
 *
 * @returns {import('rollup').RollupOptions|object}
 */
export function createConfig({ baseDir, external = [], formats = [ 'cjs', 'es' ] }, overwrites = {}) {
    // Perform a cleanup of evt. previous export, to ensure that evt. removed components are no
    // longer part of the "dist" export.
    clearDistDirectory(baseDir);

    // Load package.json schema from base directory. Then, cleanup directories...
    const schema = getPackageSchema(baseDir);

    // -------------------------------------------------------------------------------------- //

    if (formats.length === 0) {
        throw new Error('No output formats specified')
    }

    /** @type {import('rollup').OutputOptions[]} */
    let outputFormats = [];
    formats.forEach((format) => {
        outputFormats.push(makeOptionForFormat(format, schema))
    });

    // -------------------------------------------------------------------------------------- //

    /** @type {import('rollup').RollupOptions} */
    return Object.assign({
        input: 'src/index.ts',
        external: Object.keys(schema.dependencies || {})
            .concat(Object.keys(schema.peerDependencies || {}))
            .concat(builtinModules)
            .concat(external),
        onwarn: (warning) => {
            throw Object.assign(new Error(), warning);
        },
        strictDeprecations: true,
        output: outputFormats,

        plugins: [
            typescriptPlugin()
        ]
    }, overwrites);
}

/*****************************************************************
 * Output Formats
 ****************************************************************/

/**
 * Makes output option for given format
 *
 * @param {string} format E.g. cjs, es
 * @param {object} schema Package schema
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').OutputOptions|object}
 */
export function makeOptionForFormat(format, schema, overwrites = {})
{
    switch (format) {
        case 'cjs':
            return makeCommonJsFormat(schema, overwrites);

        case 'es':
            return makeESModuleFormat(schema, overwrites);

        default:
            throw new Error('Unsupported output option format ' + format);
    }
}

/**
 * Makes a new common js format output option for rollup
 *
 * @param {object} schema Package schema
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').OutputOptions|object}
 */
export function makeCommonJsFormat(schema, overwrites = {})
{
    return Object.assign({
        format: 'cjs',
        file: schema.main,
        exports: 'named',
        footer: 'module.exports = Object.assign(exports.default, exports);',
        sourcemap: true,
    }, overwrites);
}

/**
 * Makes a new ES module format output option for rollup
 *
 * @param {object} schema Package schema
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').OutputOptions|object}
 */
export function makeESModuleFormat(schema, overwrites = {})
{
    return Object.assign({
        format: 'es',
        file: schema.module,
        plugins: [
            emitModulePackageFilePlugin()
        ],
        sourcemap: true
    }, overwrites);
}

/*****************************************************************
 * Plugins
 ****************************************************************/

/**
 * Returns a new typescript plugin with given configuration options
 *
 * @param {object} [options]
 *
 * @returns {Plugin}
 */
export function typescriptPlugin(options = {})
{
    // @see https://github.com/ezolenko/rollup-plugin-typescript2
    let typeScriptOptions = Object.assign({

        // Set to true to disable the cache and do a clean build.
        // This also wipes any existing cache.
        clean: true,

        // If true, declaration files will be emitted in the declarationDir given in the tsconfig.
        // If false, declaration files will be placed inside the destination directory given in
        // the Rollup configuration [...]
        useTsconfigDeclarationDir: true,

        // 0 -- Error
        // 1 -- Warning
        // 2 -- Info
        // 3 -- Debug
        verbosity: 1,
    }, options);

    return typescript(typeScriptOptions);
}


/**
 * Plugin that emits package file
 *
 * Source from rollup:
 * @see https://github.com/rollup/plugins/blob/master/shared/rollup.config.mjs
 *
 * @returns {{generateBundle(): void, name: string}}
 */
export function emitModulePackageFilePlugin() {
    return {
        name: 'emit-module-package-file',
        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'package.json',
                source: `{"type":"module"}`
            });
        }
    };
}

/*****************************************************************
 * Other utils
 ****************************************************************/

/**
 * Get the package.json schema
 *
 * @param {URL} baseDir
 *
 * @returns {object}
 */
export const getPackageSchema = (baseDir) => {
    let path = baseDir.pathname + '/package.json';

    return JSON.parse(readFileSync(path, 'utf8'));
}

/**
 * Resolves the current package's schema
 *
 * @param {URL} baseDir
 * @param {object|null} [schema]
 *
 * @return {object} Given schema or current package.json
 */
export const resolvePackageSchema = (baseDir, schema = null) => {
    return (schema !== null)
        ? schema
        : getPackageSchema(baseDir);
}

/**
 * Clears the dist directory for the current package
 */
export function clearDistDirectory(baseDir)
{
    deleteDirectory(baseDir.pathname + 'dist');
}

/**
 * Delete a directory
 *
 * @param {string|URL} path
 * @param {boolean} [recursive]
 */
export function deleteDirectory(path, recursive = true)
{
    try {
        if (fs.existsSync(path)) {
            fs.rmdirSync(path, { recursive: recursive }); // Deprecated ?
            // fs.rm(path, {  recursive: true })

            console.log(`Deleting directory ${path}`);
        }
    } catch (error) {
        console.error(`Unable to delete directory ${path}`, error);
    }
}
