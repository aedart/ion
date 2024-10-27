import type {
    ParseOptions,
    OutputConfiguration
} from "commander";
import type {
    Application
} from "@aedart/contracts/core";
import { Application as CoreApplication } from "@aedart/core";
import { CallbackWrapper } from "@aedart/support";
import { Command as CommanderJs } from "commander";
import SkipProcessExitError from "./exceptions/SkipProcessExitError";
import { version } from "../package.json";
import * as process from "node:process";

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
     * **Note**: _Process exit is only prevented, if the `run()`'s [options]{@link import('commander').ParseOptions}
     * argument is set to `{ from: "user" }`!_
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
        const callback = CallbackWrapper.makeFor(
            this,
            this.parse,
            [argv, options]
        ); 
        
        return await this.core.run(callback);
    }

    /**
     * Destroy this Cli Application instance.
     * 
     * @see {Application.destroy}
     *
     * @return {void}
     */
    public destroy(): void
    {
        this.core.destroy();
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
            // When args are from "user", then no special parsing is done for argv[0]...etc.
            // When args are from `process.argv`, then argv[0] is the application and argv[1] is the script being run...etc.
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
            .description(this.description);
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
}