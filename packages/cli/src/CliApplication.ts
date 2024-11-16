import type {
    ParseOptions,
    OutputConfiguration
} from "commander";
import type {
    Application
} from "@aedart/contracts/core";
import type { ParseArgsConfig } from "node:util";
import { Application as CoreApplication } from "@aedart/core";
import { CallbackWrapper } from "@aedart/support";
import { Command as CommanderJs } from "commander";
import SkipProcessExitError from "./exceptions/SkipProcessExitError";
import { version } from "../package.json";
import * as process from "node:process";
import { parseArgs } from "node:util";
import { existsSync } from "node:fs";

/**
 * Cli Application
 */
export default class CliApplication
{
    /**
     * The "core" application instance
     * 
     * @type {Application}
     * 
     * @protected
     */
    protected coreApp: Application;
    
    /**
     * The underlying "driver" of this cli application
     * 
     * @type {import('commander').Command}
     * 
     * @protected
     */
    protected commander: CommanderJs;

    /**
     * State whether `process.exit()` is permitted invoked or not.
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected processExit: boolean = true;

    /**
     * The default environment variables file path to use, when none is specified
     * 
     * @type {string}
     * 
     * @protected
     */
    protected defaultEnvFile: string = '.env';
    
    /**
     * Create a new Cli Application instance
     * 
     * @param {Application} [core] Core Application instance. If none is provided,
     *                      then a default configured application is used. 
     */
    constructor(core?: Application)
    {
        this.coreApp = core ?? this.makeCoreApplication();
        this.commander = this.makeDriver();
    }

    /**
     * Returns this Cli Application's version
     * 
     * @type {string}
     */
    public get version(): string
    {
        return version;
    }

    /**
     * Returns a description of this Cli Application
     * 
     * @type {string}
     */
    public get description(): string
    {
        return `Ion Cli v${this.version}`;    
    }
    
    /**
     * The underlying "driver" of this Cli Application
     * 
     * @returns {import('commander').Command}
     */
    public get driver(): CommanderJs
    {
        return this.commander;
    }

    /**
     * The "core" application instance used by this Cli Application
     * 
     * @returns {Application}
     */
    public get core(): Application
    {
        return this.coreApp;
    }
    
    /**
     * Customise the output should be handled
     * 
     * @param {OutputConfiguration} configuration
     * 
     * @returns {this}
     */
    public output(configuration: OutputConfiguration): this
    {
        this.commander.configureOutput(configuration);
        
        return this;
    }

    /**
     * Specify whether the Cli Application must invoke `process.exit()` or not.
     * 
     * @param {boolean} [allow=true]
     * 
     * @return {this}
     */
    public allowProcessExit(allow: boolean = true): this
    {
        this.processExit = allow;

        return this;
    }

    /**
     * Opposite of {@link allowProcessExit}
     * 
     * @param {boolean} [prevent=true]
     * 
     * @return {this}
     */ 
    public preventProcessExit(prevent: boolean = true): this
    {
        return this.allowProcessExit(!prevent);
    }

    /**
     * Run this application with given arguments
     * 
     * @param {readonly string[]} [argv] Defaults to `process.argv` when no arguments given.
     * @param {ParseOptions} [options]
     * 
     * @returns {Promise<boolean>}
     */
    public async run(argv?: readonly string[], options?: ParseOptions): Promise<boolean>
    {
        this.processEnvOption(argv);
        
        return await this.core.run(CallbackWrapper.makeFor(
            this,
            this.parse,
            [argv, options]
        ));
    }
    
    // TODO: 
    protected async parse(argv?: readonly string[], options?: ParseOptions): Promise<boolean>
    {
        const driver = this.driver;

        // TODO: ... Add commands to the underlying driver.

        // Overwrite the `process.exit()` call, to ensure that the "core" application can be terminated,
        // regardless of what this Cli Application has been configured to do.
        // @see https://github.com/tj/commander.js?tab=readme-ov-file#parse-and-parseasync
        // @see https://github.com/tj/commander.js/blob/master/Readme.md#override-exit-and-output-handling
        this.overwriteProcessExit();
        
        let exitCode = 0;
        let terminated: boolean;
        try {
            // Force display help, when no arguments have been provided.
            // - When args are from "user", then no special parsing is done for argv[0]...etc.
            // - When args are from `process.argv`, then argv[0] is the application and argv[1] is the script being run...etc.
            // NOTE: In case that options are provided, the default help might not get displayed, depending on the requested
            // option...
            if ((argv === undefined && process.argv.length < 3) || argv?.length === 0) {
                driver.help();
            } else {
                // Otherwise, parse the requested command and its arguments...
                await driver.parseAsync(argv, options);    
            }
        } catch (e) {
            // Re-throw error, if it's not a "skip process exit" error. 
            if (!(e instanceof SkipProcessExitError)) {
                throw e;
            }
            
            // Set the exist code.
            exitCode = (e.cause as { exitCode?: number })?.exitCode ?? exitCode;
        } finally {
            // Regardless of circumstance, ensure that the "core" application is terminated.
            terminated = await this.core.terminate();

            // Call `process.exit()`, if allowed...
            this.exit(exitCode);
        }

        return Promise.resolve(terminated);
    }

    /**
     * Terminates this Cli Application with the given exit code
     * 
     * **Caution**: _Method will invoke `process.exit()`, if {@link processExit} is set to `true`.
     * Otherwise, this method will do nothing!_
     * 
     * @param {number} [code]
     * 
     * @returns {void|never}
     * 
     * @protected
     */
    protected exit(code: number = 0): void|never
    {
        this.core.destroy();
        
        if (this.processExit) {
            process.exit(code);
        }
    }
    
    /**
     * Creates a new "driver" and returns it.
     * 
     * @returns {import('commander').Command}
     * 
     * @protected
     */
    protected makeDriver(): CommanderJs
    {
        return (new CommanderJs())
            .version(this.version)
            .description(this.description)
            
            // This option will be processed outside the "driver's" usual way of dealing with options!
            // @see processEnvOption()
            .option('--env <file>', 'set environment variables from supplied file.', this.defaultEnvFile);
    }

    /**
     * Creates a new configured "core" application instance
     * 
     * @returns {Application}
     * 
     * @protected
     */
    protected makeCoreApplication(): Application
    {
        return (new CoreApplication());
    }
    
    /**
     * Overwrites the process exit call, in the "driver"
     * 
     * @protected
     */
    protected overwriteProcessExit(): void
    {
        this.commander.exitOverride((err) => {
            // When command was successful, wrap the command error into a "skip process exit" error 
            if (err.exitCode === 0) {
                throw new SkipProcessExitError(err.message, { cause: {
                    exitCode: err.exitCode,
                    previous: err
                } });
            }
            
            // Otherwise, simply re-throw error
            throw err;
        })
    }

    /**
     * Processes the `--env` option for the cli application
     * 
     * @param {readonly string[]} [argv] Defaults to `process.argv` when no arguments given.
     * 
     * @protected
     */
    protected processEnvOption(argv?: readonly string[]): void
    {
        // Prepare options for the `parseArgs`.
        const argsOptions: ParseArgsConfig = {
            args: (argv as string[] | undefined),

            // Define the '--env' option
            options: {
                'env': {
                    type: 'string',
                    default: this.defaultEnvFile
                }
            },

            // Ignore any other arguments and options...
            strict: false,
        }

        // Parse the arguments and extract the values
        const { values } = parseArgs(argsOptions);

        // Resolve path to `.env` file.
        const path = Reflect.has(values, 'env')
            ? values['env']
            : undefined;
        
        // Skip loading if the default environment file path is used, but does not exist
        const exists = typeof path === 'string' && existsSync(path);
        if (!exists && path === this.defaultEnvFile) {
            return;
        }
        
        // Otherwise, regardless if the file exists, attempt to load it into `process.env`.
        // If it does not exist, the `loadEnvFile()` will simply throw an error.
        process.loadEnvFile(path as string);
    }
}