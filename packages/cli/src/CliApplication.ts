import type {
    ParseOptions,
    OutputConfiguration
} from "commander";
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
     * The underlying "driver" of this cli application
     * 
     * @type {import('commander').Command}
     * 
     * @protected
     */
    protected _driver: CommanderJs;

    /**
     * State whether `process.exit()` is permitted invoked or not.
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected _allowProcessExit: boolean = true;
    
    // TODO
    constructor()
    {
        this._driver = this.makeDriver();
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
     * Returns the underlying "driver" of this Cli Application
     * 
     * @returns {import('commander').Command}
     */
    public get driver(): CommanderJs
    {
        return this._driver;
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
        this.driver.configureOutput(configuration);
        
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
        this._allowProcessExit = allow;

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
    
    // TODO:...
    public async run(argv?: readonly string[], options?: ParseOptions)
    {
        const driver = this.driver;
  
        // TODO: ... Add commands to the underlying driver.
        
        // Overwrite process exit, if needed.
        if (!this._allowProcessExit && options?.from === 'user') {
            this.overwriteProcessExit();
        }
        
        // When no arguments are given, then force display the default help.
        if ((argv === undefined && process.argv.length < 3) || argv?.length === 0) {
            driver.help();
        }
        
        // Run the application...
        try {
            await driver.parseAsync(argv, options);    
        } catch (e) {
            // Re-throw error, if it's not a "skip process exit" error. 
            if (!(e instanceof SkipProcessExitError)) {
                throw e;
            }
        }
        
        
        return Promise.resolve(this);
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
     * Overwrites the process exit call, in the "driver"
     * 
     * @protected
     */
    protected overwriteProcessExit(): void
    {
        this.driver.exitOverride((err) => {
            // When command was successful, wrap the command error into a "skip process exit" error 
            if (err.exitCode === 0) {
                throw new SkipProcessExitError(err.message, { cause: { previous: err } })
            }
            
            // Otherwise, simply re-throw error
            throw err;
        })
    }
}