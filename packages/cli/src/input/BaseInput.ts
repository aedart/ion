import type {Input, Definition, Argument} from "@aedart/contracts/cli";
import { AbstractClassError } from "@aedart/support/exceptions";
import { isset } from "@aedart/support/misc";
import { default as InputDefinition } from "./Definition";

/**
 * Base Input
 * 
 * Abstraction for concrete input instances.
 * This component is an adaptation of Symfony Console's `Input` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 * 
 * @see https://github.com/symfony/console/blob/7.1/Input/Input.php
 */
export default abstract class BaseInput implements Input
{
    /**
     * The definition for this input
     * 
     * @type {Definition}
     * 
     * @protected
     */
    protected definition: Definition;

    /**
     * The input arguments and their values
     *
     * @type {Map<string, string | number | boolean | (string|number|boolean)[] | null>}
     *
     * @protected
     */
    protected _arguments: Map<string, string | number | boolean | (string|number|boolean)[] | null>;

    /**
     * The input options and their values
     *
     * @type {Map<string, string | number | boolean | (string|number|boolean)[] | null>}
     *
     * @protected
     */
    protected _options: Map<string, string | number | boolean | (string|number|boolean)[] | null>;

    /**
     * Create new instance
     * 
     * @param {Definition} [definition]
     * 
     * @throws {AbstractClassError}
     * @throws {Error}
     */
    public constructor(definition?: Definition)
    {
        if (new.target === BaseInput) {
            throw new AbstractClassError(BaseInput);
        }

        // Defaults
        this._arguments = new Map();
        this._options = new Map();
        this.definition = new InputDefinition();
        
        // Stop processing if no definition provided
        if (!isset(definition)) {
            return;
        }

        this
            .bind(definition as Definition)
            .validate();
    }
    
    /**
     * Bind given Input Definition to this input
     *
     * @param {Definition} definition
     *
     * @return {this}
     */
    public bind(definition: Definition): this
    {
        this._arguments.clear();
        this._options.clear();
        this.definition = definition;
        
        this.parse();
        
        return this;
    }

    /**
     * Parse the command line arguments
     * 
     * @return {void}
     *
     * @abstract
     * @protected
     */
    protected abstract parse(): void;
    
    /**
     * Validate the input
     *
     * @throws {Error}
     *
     * @return {this}
     */
    public validate(): this
    {
        let definition: Definition = this.definition;
        let givenArguments: Map<
            string,
            string | number | boolean | (string|number|boolean)[] | null
        > = this._arguments;

        const missingArguments: string[] = [];
        const allowedArguments: Map<string, Argument> = definition.arguments;
        allowedArguments.forEach((argument) => {
            if (argument.isRequired() && !givenArguments.has(argument.name)) {
                missingArguments.push(argument.name);
            }
        });
        
        if (missingArguments.length > 0) {
            throw new TypeError(`Missing required arguments: ${missingArguments.join(', ')}.`);
        }

        return this;
    }

    /**
     * Set value for given argument
     *
     * @param {string} name
     * @param {string | number | boolean | (string | number | boolean)[] | null} value
     *
     * @return {this}
     *
     * @throws {TypeError} If argument does not exist
     */
    public setArgument(name: string, value: string | number | boolean | (string|number|boolean)[] | null): this
    {
        if (!this.definition.hasArgument(name)) {
            throw new TypeError(`The "${name}" argument does not exist.`);
        }
        
        this._arguments.set(
            name,
            this.definition.getArgument(name).getDefault()
        );

        return this;
    }

    /**
     * Get value for given argument
     *
     * @template T = string | number | boolean | (string|number|boolean)[] | null
     *
     * @param {string} name
     *
     * @return {T}
     *
     * @throws {TypeError} If argument does not exist
     */
    public getArgument<
        T = string | number | boolean | (string|number|boolean)[] | null
    >(name: string): T
    {
        if (!this.definition.hasArgument(name)) {
            throw new TypeError(`The "${name}" argument does not exist.`);
        }
        
        return this.resolveArgumentValue<T>(name, this._arguments.get(name));
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
        return this.definition.hasArgument(name);
    }

    /**
     * Input arguments merged with their default values
     *
     * @type {Map<string, string | number | boolean | (string | number | boolean)[] | null>}
     */
    public get arguments(): Map<string, string | number | boolean | (string|number|boolean)[] | null>
    {
        const output: Map<
            string,
            string | number | boolean | (string|number|boolean)[] | null
        > = new Map();
        
        this._arguments.forEach((value, name) => {
            output.set(name, this.resolveArgumentValue(name, value));
        });
        
        return output;
    }

    /**
     * Set value for given option
     *
     * @param {string} name
     * @param {string | number | boolean | (string | number | boolean)[] | null} value
     *
     * @return {this}
     *
     * @throws {TypeError} If option does not exist
     */
    public setOption(name: string, value: string | number | boolean | (string|number|boolean)[] | null): this
    {
        if (this.definition.hasNegation(name)) {
            this._options.set(
                this.definition.negationToName(name),
                !(value as boolean)
            );
            
            return this;
        }
        
        if (!this.definition.hasOption(name)) {
            throw new TypeError(`The "${name}" option does not exist.`);
        }
        
        this._options.set(name, value);

        return this;
    }

    /**
     * Get value for given option
     *
     * @template T = string | number | boolean | (string|number|boolean)[] | null
     *
     * @param {string} name
     *
     * @return {T}
     *
     * @throws {TypeError} If option does not exist
     */
    public getOption<
        T = string | number | boolean | (string|number|boolean)[] | null
    >(name: string): T
    {
        if (this.definition.hasNegation(name)) {
            const value = this.getOption<T>(this.definition.negationToName(name));
            if (!isset(value)) {
                return value;
            }
            
            return !(value as boolean) as T;
        }
        
        if (!this.definition.hasOption(name)) {
            throw new TypeError(`The "${name}" option does not exist.`);
        }

        return this.resolveOptionValue<T>(name, this._options.get(name));
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
        return this.definition.hasOption(name) || this.definition.hasNegation(name);
    }

    /**
     * Input options merged with their default values
     *
     * @type {Map<string, string | number | boolean | (string | number | boolean)[] | null>}
     */
    public get options(): Map<string, string | number | boolean | (string|number|boolean)[] | null>
    {
        const output: Map<
            string,
            string | number | boolean | (string|number|boolean)[] | null
        > = new Map();

        this._options.forEach((value, name) => {
            output.set(name, this.resolveOptionValue(name, value));
        });

        return output;
    }

    /**
     * Resolves argument value
     *
     * @template T = string | number | boolean | (string|number|boolean)[] | null
     *
     * @param {string} name
     * @param {unknown} [value]
     *
     * @return {T}
     *
     * @protected
     */
    protected resolveArgumentValue<
        T = string | number | boolean | (string|number|boolean)[] | null
    >(name: string, value?: unknown): T
    {
        if (!isset(value)) {
            value = this.definition.getArgument(name).getDefault();
        }

        return value as T;
    }

    /**
     * Resolves option value
     *
     * @template T = string | number | boolean | (string|number|boolean)[] | null
     *
     * @param {string} name
     * @param {unknown} [value]
     *
     * @return {T}
     *
     * @protected
     */
    protected resolveOptionValue<
        T = string | number | boolean | (string|number|boolean)[] | null
    >(name: string, value?: unknown): T
    {
        if (!isset(value)) {
            value = this.definition.getOption(name).getDefault();
        }

        return value as T;
    }
}