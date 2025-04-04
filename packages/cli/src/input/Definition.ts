import type {
    Definition as DefinitionContract,
    Argument,
    Option,
} from "@aedart/contracts/cli";
import { default as InputArgument } from "./Argument";
import { default as InputOption } from "./Option";
import { LogicalError } from "@aedart/support/exceptions";

/**
 * Input Definition
 *
 * A representation of the input arguments and options for a command.
 * This component is an adaptation of Symfony Console's `InputDefinition` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.1/Input/InputDefinition.php
 */
export default class Definition implements DefinitionContract
{
    /**
     * The input arguments
     * 
     * @type {Map<string, Argument>}
     * 
     * @protected
     */
    protected _arguments: Map<string, Argument>;

    /**
     * The input options
     * 
     * @type {Map<string, Option>}
     * 
     * @protected
     */
    protected _options: Map<string, Option>;
    
    /**
     * Amount of required input arguments
     * 
     * @type {number}
     * 
     * @protected
     */
    protected _amountRequiredArguments: number = 0;

    /**
     * The last optional input argument
     * 
     * @type {Argument | undefined}
     * 
     * @protected
     */
    protected _lastOptionalArgument: Argument|undefined = undefined;

    /**
     * The last "array" input argument
     * 
     * @type {Argument | undefined}
     * 
     * @protected
     */
    protected _lastArrayArgument: Argument|undefined = undefined;

    /**
     * Map of negated options
     * 
     * @type {Map<string, string>} Key = negated name, value = option name 
     * 
     * @protected
     */
    protected negations: Map<string, string>;

    /**
     * Map of option shortcuts
     *
     * @type {Map<string, string>} Key = shortcut name, value = option name
     *
     * @protected
     */
    protected shortcuts: Map<string, string>;
    
    /**
     * Create a new Input Definition instance
     * 
     * @param {(Argument | Option)[]} [definition]
     */
    public constructor(definition: (Argument|Option)[] = [])
    {
        this._arguments = new Map();
        this._options = new Map();
        this.negations = new Map();
        this.shortcuts = new Map();
        
        this.setDefinition(definition);
    }
    
    /**
     * Set the definition of the input
     *
     * @param {(Argument | Option)[]} input
     *
     * @return {this}
     */
    public setDefinition(input: (Argument|Option)[]): this
    {
        let args: Argument[] = [];
        let options: Option[] = [];
        
        for(const elem of input) {
            if (elem instanceof InputArgument) {
                args.push(elem);
                continue;
            }

            if (elem instanceof InputOption) {
                options.push(elem);
                continue;
            }
            
            throw new TypeError('Element must be of the type input "Argument" or input "Option"');
        }
        
        return this
            .setArguments(args)
            .setOptions(options);
    }

    /**
     * Set the input arguments
     *
     * @param {Argument[]} [args]
     *
     * @return {this}
     */
    public setArguments(args?: Argument[]): this
    {
        args = args ?? [];
        
        this._arguments.clear();
        this._amountRequiredArguments = 0;
        this._lastOptionalArgument = undefined;
        this._lastArrayArgument = undefined;
        
        return this.addArguments(args);
    }

    /**
     * Add input arguments
     *
     * @param {Argument[]} args
     *
     * @return {this}
     */
    public addArguments(args: Argument[]): this
    {
        for (const arg of args) {
            this.addArgument(arg);
        }
        
        return this;
    }

    /**
     * Add input argument
     *
     * @param {Argument} argument
     *
     * @return {this}
     */
    public addArgument(argument: Argument): this
    {
        if (this._arguments.has(argument.name)) {
            throw new LogicalError(`An argument with the name "${argument.name}" already exists.`);
        }
        
        if (this._lastArrayArgument !== undefined) {
            throw new LogicalError(`Cannot add argument "${argument.name}" after an array argument "${this._lastArrayArgument.name}".`);
        }
        
        if (argument.isRequired() && this._lastOptionalArgument !== undefined) {
            throw new LogicalError(`Cannot add required argument "${argument.name}" after an optional argument "${this._lastOptionalArgument.name}".`);
        }
        
        if (argument.isArray()) {
            this._lastArrayArgument = argument;
        }
        
        if (argument.isRequired()) {
            this._amountRequiredArguments++;
        } else {
            this._lastOptionalArgument = argument;
        }
        
        this._arguments.set(argument.name, argument);

        return this;
    }

    /**
     * Determine if input argument exists
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    public hasArgument(name: string): boolean
    {
        return this._arguments.has(name);
    }

    /**
     * Returns input argument that matches given name
     *
     * @param {string} name
     *
     * @return {Argument}
     *
     * @throws {TypeError}
     */
    public getArgument(name: string): Argument
    {
        if (!this.hasArgument(name)) {
            throw new TypeError(`Argument "${name}" does not exist`);
        }
        
        return this._arguments.get(name) as Argument;
    }

    /**
     * The input arguments
     *
     * @type {Map<string, Argument>}
     */
    public get arguments(): Map<string, Argument>
    {
        return this._arguments;
    }

    /**
     * Amount of input arguments
     *
     * @type {number}
     */
    public get amountOfArguments(): number
    {
        return this._arguments.size;
    }

    /**
     * Amount of required input arguments
     *
     * @type {number}
     */
    public get amountOfRequiredArguments(): number
    {
        return this._amountRequiredArguments;
    }

    /**
     * Map of input arguments (names) and their default value
     *
     * @type {Map<string, string | number | boolean | (string | number | boolean)[] | null>}
     */
    public get argumentDefaults(): Map<string, string | number | boolean | (string|number|boolean)[] | null>
    {
        const defaults: Map<string, string | number | boolean | (string|number|boolean)[] | null> = new Map();
        
        this._arguments.forEach((argument, name) => {
            defaults.set(name, argument.getDefault());
        })
        
        return defaults;
    }

    /**
     * Set the input options
     *
     * @param {Option[]} [options]
     *
     * @return {this}
     */
    public setOptions(options?: Option[]): this
    {
        options = options ?? [];
        
        this._options.clear();
        this.shortcuts.clear();
        this.negations.clear();
        
        return this.addOptions(options);
    }

    /**
     * Add input options
     *
     * @param {Option[]} options
     *
     * @return {this}
     */
    public addOptions(options: Option[]): this
    {
        for(const option of options) {
            this.addOption(option);
        }
        
        return this;
    }

    /**
     * Add input option
     *
     * @param {Option} option
     *
     * @return {this}
     */
    public addOption(option: Option): this
    {
        // Abort if given option's name has already been added, and somehow it does NOT match
        // the existing option.
        if (this._options.has(option.name) && !option.equals(this._options.get(option.name) as Option)) {
            throw new LogicalError(`An option with the name "${option.name}" already exists.`);
        }
        
        if (this.negations.has(option.name)) {
            throw new LogicalError(`An option with the name "${option.name}" already exists.`);
        }
        
        const shortcuts: string[] = option.shortcuts;
        if (shortcuts.length !== 0) {
            for (const shortcut of shortcuts) {
                if (this.shortcuts.has(shortcut) && !option.equals(this._options.get(this.shortcuts.get(shortcut) as string) as Option)) {
                    throw new LogicalError(`An option with the shortcut "${shortcut}" already exists.`);
                }
                
                this.shortcuts.set(shortcut, option.name);
            }
        }
        
        this._options.set(option.name, option);
        
        if (option.isNegatable()) {
            if (this._options.has(option.negatedName)) {
                throw new LogicalError(`An option with the name "${option.negatedName}" already exists.`);
            }
            
            this.negations.set(option.negatedName, option.name);
        }

        return this;
    }

    /**
     * Determine if input option exists
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    public hasOption(name: string): boolean
    {
        return this._options.has(name);
    }

    /**
     * Returns input option that matches given name
     *
     * @param {string} name
     *
     * @return {Option}
     *
     * @throws {TypeError}
     */
    public getOption(name: string): Option
    {
        if (!this.hasOption(name)) {
            throw new TypeError(`Option "--${name}" does not exist`);
        }
        
        return this._options.get(name) as Option;
    }

    /**
     * Determine if input option exists using its shortcut name
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    public hasShortcut(name: string): boolean
    {
        return this.shortcuts.has(name);
    }

    /**
     * Determine if input option exists using its negated name
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    public hasNegation(name: string): boolean
    {
        return this.negations.has(name);
    }
    
    /**
     * Returns the input option's name that matches given shortcut
     *
     * @param {string} shortcut
     *
     * @return {string}
     *
     * @throws {TypeError}
     */
    public shortcutToName(shortcut: string): string
    {
        if (!this.shortcuts.has(shortcut)) {
            throw new TypeError(`Option "-${shortcut}" does not exist`);
        }
        
        return this.shortcuts.get(shortcut) as string;
    }

    /**
     * Returns the input option's name that matches given negated name
     *
     * @param {string} negated
     *
     * @return {string}
     *
     * @throws {TypeError}
     */
    public negationToName(negated: string): string
    {
        if (!this.negations.has(negated)) {
            throw new TypeError(`Option "--${negated}" does not exist`);
        }

        return this.negations.get(negated) as string;
    }
    
    /**
     * Returns input option that matches given shortcut
     *
     * @param {string} shortcut
     *
     * @return {Option}
     *
     * @throws {TypeError}
     */
    public getOptionForShortcut(shortcut: string): Option
    {
        return this.getOption(this.shortcutToName(shortcut));
    }

    /**
     * The input options
     *
     * @type {Map<string, Option>}
     */
    public get options(): Map<string, Option>
    {
        return this._options;
    }

    /**
     * Amount of input options
     *
     * @type {number}
     */
    public get amountOfOptions(): number
    {
        return this._options.size;
    }

    /**
     * Map of input options (names) and their default value
     *
     * @type {Map<string, string | number | boolean | (string | number | boolean)[] | null>}
     */
    public get optionDefaults(): Map<string, string | number | boolean | (string|number|boolean)[] | null>
    {
        const defaults: Map<string, string | number | boolean | (string|number|boolean)[] | null> = new Map();
        
        this._options.forEach((option, name) => {
            defaults.set(name, option.getDefault());
        })

        return defaults;
    }
}
