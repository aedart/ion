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
import dts from "rollup-plugin-dts";
import del from 'rollup-plugin-delete'

/**
 * Creates a new rollup configuration for given package
 *
 * @param {string|URL} baseDir Base directory of the package
 * @param {string[]} [external] List of external dependencies to exclude.
 *                              Package's dependencies and peer dependencies are automatically
 *                              excluded.
 * @param {string[]} [submodules] Names of eventual submodules to export
 * @param {string[]} [formats] Output formats, e.g. cjs, es
 * @param {import('rollup').RollupOptions|object} [overwrites]
 *
 * @returns {import('rollup').RollupOptions[]|object[]}
 */
export function createConfig({ baseDir, external = [], submodules = [], formats = [ 'cjs', 'es' ] }, overwrites = {}) {
    // Perform a cleanup of evt. previous export, to ensure that evt. removed components are no
    // longer part of the "dist" export.
    clearDistDirectory(baseDir);

    // Load package.json schema from base directory. Then, cleanup directories...
    const schema = getPackageSchema(baseDir);

    // -------------------------------------------------------------------------------------- //
    // Add formats to output

    if (formats.length === 0) {
        throw new Error('No output formats specified')
    }

    /** @type {import('rollup').OutputOptions[]} */
    let outputFormats = [];
    formats.forEach((format) => {
        outputFormats.push(makeFormat(format, schema))
    });

    // -------------------------------------------------------------------------------------- //
    // Create the main configuration object

    let main = makeMainExport(schema, external, outputFormats, overwrites);

    // -------------------------------------------------------------------------------------- //
    // Make configuration for eventual submodules
    let submodulesConfig = [];
    submodules.forEach((target) => {
        submodulesConfig.push(
            ...makeSubmodule(target, schema, formats)
        );
    });

    // -------------------------------------------------------------------------------------- //
    // Finally, return the final configuration for the package...

    return [
        // Main...
        main,
        makeBundleDtsConfig(schema),
        makeCleanupConfig(schema),

        // Evt. submodules...
        ...submodulesConfig,
    ];
}

/**
 * Returns export configuration for a submodule
 *
 * @param {string} target Name of submodule (directory name)
 * @param {object} schema Package schema
 * @param {string[]} [formats] Output formats, e.g. cjs, es
 * @param {string[]} [external] List of external dependencies to exclude.
 *                              Package's dependencies and peer dependencies are automatically
 *                              excluded.
 * @param {import('rollup').RollupOptions|object} [overwrites]
 * @returns {(import('rollup').RollupOptions|Object)[]}
 */
export function makeSubmodule(target, schema, formats = [ 'cjs', 'es' ], external = [], overwrites = {})
{
    if (formats.length === 0) {
        throw new Error('No output formats specified')
    }

    // -------------------------------------------------------------------------------------- //
    // Make output formats for submodule

    /** @type {import('rollup').OutputOptions[]} */
    let output = [];
    formats.forEach((format) => {
        let formatOption = makeFormat(format, schema, './' + target);

        output.push(formatOption);
    });

    // -------------------------------------------------------------------------------------- //
    // Create main export config for submodules
    let main = makeMainExport(schema, external, output, overwrites);
    main.input = 'src/' + target + '/index.ts';

    // Make dts configuration for submodule
    let dts = makeBundleDtsConfig(
        schema,
        'dist/tmp/' + target + '/index.d.ts',
        schema.exports['./' + target].types
    );

    // -------------------------------------------------------------------------------------- //
    // Make cleanup config, for submodule...
    let dummyFile = 'dist/es/' + target + '.js';
    let cleanup = makeCleanupConfig(schema);
    cleanup.input = dummyFile ;
    cleanup.output.file = dummyFile;

    // -------------------------------------------------------------------------------------- //
    // Finally, return configuration entries for submodule
    return [
        main,
        dts,
        cleanup
    ];
}

/**
 * Returns a main export rollup option entry
 *
 * @param {object} schema Package schema
 * @param {string[]} [external] List of external dependencies to exclude.
 *                              Package's dependencies and peer dependencies are automatically
 *                              excluded.
 * @param {import('rollup').OutputOptions[]} [outputFormats] Output formats, e.g. cjs, es
 * @param {import('rollup').RollupOptions|object} [overwrites]
 *
 * @returns {import('rollup').RollupOptions}
 */
export function makeMainExport(schema, external = [], outputFormats = [], overwrites = {})
{
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
 * @param {string} [exportsKey] Name of schema "exports" key where to find output destination
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').OutputOptions|object}
 */
export function makeFormat(format, schema, exportsKey = '.', overwrites = {})
{
    switch (format) {
        case 'cjs':
            return makeCommonJsFormat(schema, exportsKey, overwrites);

        case 'es':
            return makeESModuleFormat(schema, exportsKey, overwrites);

        default:
            throw new Error('Unsupported output option format ' + format);
    }
}

/**
 * Makes a new common js format output option for rollup
 *
 * @param {object} schema Package schema
 * @param {string} [exportsKey] Name of schema "exports" key where to find output destination
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').OutputOptions|object}
 */
export function makeCommonJsFormat(schema, exportsKey = '.', overwrites = {})
{
    return Object.assign({
        format: 'cjs',
        //file: schema.main,
        file: schema.exports[exportsKey].require,
        exports: 'named',
        banner: makeBanner(schema),
        footer: 'module.exports = Object.assign(exports.default, exports);',
        sourcemap: true,
    }, overwrites);
}

/**
 * Makes a new ES module format output option for rollup
 *
 * @param {object} schema Package schema
 * @param {string} [exportsKey] Name of schema "exports" key where to find output destination
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').OutputOptions|object}
 */
export function makeESModuleFormat(schema, exportsKey = '.', overwrites = {})
{
    return Object.assign({
        format: 'es',
        //file: schema.module,
        file: schema.exports[exportsKey].import,
        banner: makeBanner(schema),
        plugins: [
            emitModulePackageFilePlugin()
        ],
        sourcemap: true
    }, overwrites);
}

/*****************************************************************
 * Other utils...
 ****************************************************************/

/**
 * Makes a new "bundle *.d.ts" configuration
 *
 * @param {object} schema Package schema
 * @param {string} [input] Path to input *.d.ts file.
 * @param {string|null} [output] Output file. Defaults to "schema.exports['.'].types" when not given
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').RollupOptions|object}
 */
export function makeBundleDtsConfig(schema, input = 'dist/tmp/index.d.ts', output = null, overwrites = {})
{
    return Object.assign({
        input: input,
        output: {
            // file: 'dist/types/index.d.ts',
            file: output || schema.exports['.'].types,
            format: 'es',
            banner: makeBanner(schema),
        },
        plugins: [
            dts()
        ],
        onwarn: (warning) => {
            throw Object.assign(new Error(), warning);
        },
    }, overwrites);
}

/**
 * Makes a new "cleanup" after build configuration
 *
 * @param {object} schema Package schema
 * @param {string[]} [targets] Directories to delete
 * @param {import('rollup').OutputOptions|object} [overwrites]
 *
 * @returns {import('rollup').RollupOptions|object}
 */
export function makeCleanupConfig(schema, targets = [ 'dist/tmp' ], overwrites = {})
{
    return Object.assign({
        input: schema.exports['.'].import,
        output: {
            file: schema.exports['.'].import,
            format: 'es',
        },
        plugins: [

            // Clear specified directories...
            del({
                targets: targets,
                hook: "buildEnd",
                force: true,
                runOnce: true,
                verbose: false
            }),
        ]
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
            fs.rmdirSync(path, { recursive: recursive }); // TODO: Deprecated ?
            // fs.rm(path, {  recursive: true })

            console.log(`Deleting directory ${path}`);
        }
    } catch (error) {
        console.error(`Unable to delete directory ${path}`, error);
    }
}

/**
 * Makes output file banner
 *
 * @param {object} schema Package schema
 *
 * @returns {string}
 */
export function makeBanner(schema)
{
    const name = schema.name;
    const license = schema.license;
    const date = new Date().getFullYear();

    return `/**
 * ${name}
 * 
 * ${license}, Copyright (c) 2021-${date} Alin Eugen Deac <aedart@gmail.com>
 */
`;
}
