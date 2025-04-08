import type { Definition } from "@aedart/contracts/cli";
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
     * Parsed tokens
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
    
    protected parseShortOption(token: string): this
    {
        // TODO:
        return this;
    }
    
    protected parseLongOption(token: string): this
    {
        // TODO:
        return this;
    }
    
    protected parseArgument(token: string): this
    {
        // TODO:
        return this;
    }
}