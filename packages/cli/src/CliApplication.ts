import type {
    ParseOptions,
    OutputConfiguration
} from "commander";
import { Command } from "commander";
import { version } from "../package.json";

/**
 * Cli Application
 */
export default class CliApplication
{
    /**
     * The underlying "driver" of this cli application
     * 
     * @type {Command}
     * 
     * @protected
     */
    protected _driver: Command;
    
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
     * @returns {Command}
     */
    public get driver(): Command
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
    
    // TODO:...
    public async run(argv?: readonly string[], options?: ParseOptions)
    {
        const driver = this.driver;
  
        // TODO: ... Add commands to the underlying driver.
        
        // When no arguments are given, then force display the default help.
        if (!argv || argv?.length < 3) {
            driver.help();
        }
        
        // Run the application...
        await driver.parseAsync(argv, options);
        
        return Promise.resolve(this);
    }
    
    /**
     * Creates a new "driver" and returns it.
     * 
     * @returns {Command}
     * 
     * @protected
     */
    protected makeDriver(): Command
    {
        return (new Command())
            .version(this.version)
            .description(this.description);
    }
}