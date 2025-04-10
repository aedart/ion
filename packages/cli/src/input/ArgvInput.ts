import type { Definition, Argument, Option } from "@aedart/contracts/cli";
import { isset } from "@aedart/support/misc";
import process from "node:process";
import BaseInput from "./BaseInput";

/**
 * Argv Input
 * 
 * Input from the CLI arguments.
 * This component is an adaptation of Symfony Console's `ArgvInput` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.1/Input/ArgvInput.php
 * @see {BaseInput}
 * @see https://nodejs.org/docs/latest/api/process.html#processargv
 */
export default class ArgvInput extends BaseInput
{
    /**
     * The raw command-line arguments
     * 
     * @type {string[]}
     * @protected
     */
    protected tokens: string[] = [];

    /**
     * Command line arguments (tokens) to be parsed.
     * 
     * @type {string[]}
     * @protected
     */
    protected parsed: string[] = [];
    
    /**
     * Create new instance of "argv" input
     * 
     * @param {string[]} [argv] Defaults to [process.argv]{@link import('node:process').argv} when not provided.
     *                          **Note**: The first two elements (process.execPath and file execution path) are
     *                          ignored from given array! 
     * @param {Definition} [definition]
     */
    public constructor(argv?: string[], definition?: Definition) {
        super(definition);

        argv = argv ?? process.argv;
        
        this.setTokens(argv.slice(2));
    }

    /**
     * Set the raw command-line arguments as an array
     * 
     * @param {string[]} tokens
     * 
     * @return {this}
     * 
     * @throws {TypeError}
     * 
     * @protected
     */
    protected setTokens(tokens: string[]): this
    {
        if (!Array.isArray(tokens)) {
            throw new TypeError('Tokens must be a an array of command-line arguments.');
        }
        
        this.tokens = tokens;
        
        return this;
    }

    /**
     * The raw command-line arguments
     * 
     * @type {string[]}
     */
    public get rawTokens(): string[]
    {
        // Ensure that a copy of the raw tokens array is
        // returned, to avoid unintended changes.

        return structuredClone(this.tokens);
    }
    
    /**
     * @inheritdoc
     */
    protected parse(): void
    {
        // Create a deep copy of the provided tokens
        this.parsed = structuredClone(this.tokens);
        
        let parseOptions: boolean = true;
        
        while(this.parsed.length) {
            const token = this.parsed.shift() as string;
            parseOptions = this.parseToken(token, parseOptions);
        }
    }

    /**
     * Parse given token
     * 
     * @param {string} token
     * @param {boolean} parseOptions
     * 
     * @return {boolean} New `parseOptions` state
     * 
     * @throws {Error}
     * 
     * @protected
     */
    protected parseToken(token: string, parseOptions: boolean): boolean
    {
        if (parseOptions && token === '') {
            this.parseArgument(token);
        } else if (parseOptions && token === '--') {
            return false;
        } else if (parseOptions && token.startsWith('--')) {
            this.parseLongOption(token);
        } else if (parseOptions && token.at(0)?.startsWith('-') && token !== '-') {
            this.parseShortOption(token);
        } else {
            this.parseArgument(token);
        }
        
        return parseOptions;
    }

    /**
     * Parse an option via its shortcut alias
     * 
     * @param {string} token
     * 
     * @return {this}
     * 
     * @throws {TypeError}
     * 
     * @protected
     */
    protected parseShortOption(token: string): this
    {
        // Obtain shortcut name, without leading dash "-"
        const name = token.substring(1);
        
        if (name.length > 1) {
            if (this.definition.hasShortcut(name.at(0) as string) && this.definition.getOptionForShortcut(name.at(0) as string).acceptsValue()) {
                return this.addShortOption(name.at(0) as string, name.substring(1));
            }

            return this.parseShortOptionSet(name);
        }
        
        return this.addShortOption(name, null);
    }

    /**
     * Parse a short option set
     * 
     * @param {string} name
     * 
     * @return {this}
     * 
     * @throws {TypeError}
     * 
     * @protected
     */
    protected parseShortOptionSet(name: string): this
    {
        for (let i = 0; i < name.length; i++) {
            const shortcut: string = name.at(i) as string;

            if (!this.definition.hasShortcut(shortcut)) {
                throw new TypeError(`The "-${shortcut}" option does not exist.`);
            }

            const option: Option = this.definition.getOptionForShortcut(shortcut);
            if (option.acceptsValue()) {
                return this.addLongOption(
                    option.name,
                    (i === name.length - 1)
                        ? null
                        : name.substring(i + 1)
                );
                //break;
            }
            
            this.addLongOption(option.name, null);
        }

        return this;
    }

    /**
     * Parse a long option
     * 
     * @param {string} token
     * 
     * @return {this}
     * 
     * @throws {TypeError}
     * 
     * @protected
     */
    protected parseLongOption(token: string): this
    {
        // Obtain option name, without leading dashes "--"
        const name = token.substring(2);
        
        const position: number = name.indexOf('=');
        if (position !== -1) {
            const value: string = name.substring(position + 1);
            
            if (value.length === 0) {
                this.parsed.unshift(value);
            }
            
            return this.addLongOption(name.substring(0, position), value);
        }
        
        return this.addLongOption(name, null);
    }

    /**
     * Parse an argument
     * 
     * @param {string} token
     * 
     * @return {this}
     * 
     * @throws {TypeError}
     * 
     * @protected
     */
    protected parseArgument(token: string): this
    {
        const amount: number = this._arguments.size;
        
        // Add another argument, if input expects it...
        if (this.definition.hasArgument(amount)) {
            const argument: Argument = this.definition.getArgument(amount);
            
            return this.setArgument(
                argument.name,
                argument.isArray()
                    ? [ token ]
                    : token
            );
        }
        
        // Append token, if last argument is defined as an array...
        if (this.definition.hasArgument(amount - 1) && this.definition.getArgument(amount - 1).isArray()) {
            const argument: Argument = this.definition.getArgument(amount - 1);

            let existing = this._arguments.has(argument.name)
                ? this._arguments.get(argument.name)
                : [];

            if (isset(existing) && !Array.isArray(existing)) {
                existing = [ existing as string ];
            }

            (existing as string[]).push(token as string);

            return this.setArgument(argument.name, existing as string[]);
        }
        
        // Otherwise, deal with an "unexpected" argument...
        const all = structuredClone(this.definition.arguments);
        const first = all.keys().next().value;
        const argument: Argument | undefined = isset(first)
            ? all.get(first as string)
            : undefined;
        
        const target: string = 'command';
        let commandName: string|null = null;
        if (isset(argument) && argument?.name === target) {
            commandName = this._arguments.has(target)
                ? this._arguments.get(target) as string
                : null;
            
            all.delete(first as string);
        }
        
        let message: string;
        if (all.size > 0) {
            const expectedArgs: string = Array.from(all.keys()).join('" "');
            
            if (isset(commandName)) {
                message = `Too many arguments to "${commandName}" command, expected arguments "${expectedArgs}".`;
            } else {
                message = `Too many arguments, expected arguments "${expectedArgs}".`;
            }
        } else if (isset(commandName)) {
            message = `No arguments expected for "${commandName}" command, got "${token}".`;
        } else {
            message = `No arguments expected, got "${token}".`;
        }
        
        throw new TypeError(message);
    }

    /**
     * Add an option via its shortcut alias
     *
     * @param {string} shortcut
     * @param {string | number | boolean | (string | number | boolean)[] | null} value
     *
     * @return {this}
     *
     * @throws {TypeError}
     *
     * @protected
     */
    protected addShortOption(shortcut: string, value: string | number | boolean | (string|number|boolean)[] | null): this
    {
        if (!this.definition.hasShortcut(shortcut)) {
            throw new TypeError(`The "-${shortcut}" option does not exist.`);
        }

        return this.addLongOption(
            this.definition.getOptionForShortcut(shortcut).name,
            value
        )
    }

    /**
     * Add an option
     *
     * @param {string} name
     * @param {string | number | boolean | (string | number | boolean)[] | null} value
     *
     * @return {this}
     *
     * @throws {TypeError}
     *
     * @protected
     */
    protected addLongOption(name: string, value: string | number | boolean | (string|number|boolean)[] | null): this
    {
        if (!this.definition.hasOption(name)) {
            if (!this.definition.hasNegation(name)) {
                throw new TypeError(`The "--${name}" option does not exist.`);
            }

            // Resolve negated option
            name = this.definition.negationToName(name);
            if (isset(value)) {
                throw new TypeError(`The "--${name}" option does not accept a value.`);
            }
            
            this._options.set(name, false);

            return this;
        }

        const option: Option = this.definition.getOption(name);

        if (isset(value) && !option.acceptsValue()) {
            throw new TypeError(`The "--${name}" option does not accept a value.`);
        }
        
        const emptyValues = ['', null, undefined]; 
        if (emptyValues.indexOf(value as string) !== -1 && option.acceptsValue() && this.parsed.length > 0) {
            const next = this.parsed.shift();

            if ((isset(next?.at(0)) && next?.at(0) !== '-') || emptyValues.indexOf(next) !== -1) {
                value = next as string;
            } else {
                this.parsed.unshift(next as string);
            }
        }

        if (!isset(value)) {
            if (option.isValueRequired()) {
                throw new TypeError(`The "--${name}" option requires a value.`);
            }

            if (!option.isArray() && !option.isValueOptional()) {
                value = true;
            }
        }
        
        if (option.isArray()) {
            let existing = this._options.has(name)
                ? this._options.get(name)
                : [];
            
            if (isset(existing) && !Array.isArray(existing)) {
                existing = [ existing as string ];
            }

            (existing as string[]).push(value as string);

            this._options.set(name, existing as string[]);
            return this;
        }
        
        this._options.set(name, value);
        return this;
    }
}