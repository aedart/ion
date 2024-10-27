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
        
        await this.core.run(callback);
        
        return this.core.terminate();
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

        // Determine if args are from "user".
        // @see https://github.com/tj/commander.js?tab=readme-ov-file#parse-and-parseasync
        const argsFromUser = (options?.from === 'user');

        // Overwrite process exit, if needed.
        if (!this.processExit && argsFromUser) {
            this.overwriteProcessExit();
        }

        // When no arguments are given, then force display the default help.
        const minArgsLength = argsFromUser
            ? 1  // when args are from "user", then no special parsing is done for argv[0]...etc.   
            : 3; // argv[0] is the application and argv[1] is the script being run.

        if ((argv === undefined && process.argv.length < minArgsLength) || argv?.length === 0) {
            driver.help();
        }

        // Parse arguments and invoke requested command...
        try {
            await driver.parseAsync(argv, options);
        } catch (e) {
            // Re-throw error, if it's not a "skip process exit" error. 
            if (!(e instanceof SkipProcessExitError)) {
                throw e;
            }
        }

        return Promise.resolve(true);
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
                throw new SkipProcessExitError(err.message, { cause: { previous: err } })
            }
            
            // Otherwise, simply re-throw error
            throw err;
        })
    }
}