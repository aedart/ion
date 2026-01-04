import type { Definition } from "@aedart/contracts/cli";
import { isset } from "@aedart/support/misc";
import BaseInput from "./BaseInput"

/**
 * Map Input
 * 
 * Cli input represented as a Map.
 * This component is an adaptation of Symfony Console's `ArrayInput` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.1/Input/ArrayInput.php
 * @see {BaseInput}
 */
export default class MapInput extends BaseInput
{
    /**
     * The raw provided arguments and options map
     * 
     * @type {Map<string, string | number | boolean | (string | number | boolean)[] | null>}
     * 
     * @protected
     */
    protected rawParameters: Map<string, string | number | boolean | (string|number|boolean)[] | null>;

    /**
     * Create new instance of "Map" input
     * 
     * @param {Map<string, string | number | boolean | (string | number | boolean)[] | null>} parameters
     * @param {Definition} [definition]
     */
    public constructor(
        parameters: Map<string, string | number | boolean | (string|number|boolean)[] | null>,
        definition?: Definition
    ) {
        super(definition);
        
        this.rawParameters = parameters;
    }
    
    /**
     * @inheritDoc
     * 
     * @protected
     */
    protected parse(): void {
        this.rawParameters.forEach((value, name) => {
            if (name === '--') {
                return;
            }
            
            // Add parameter as "long option"
            if (name.startsWith('--')) {
                this.addLongOption(name.substring(2), value);
                return;
            }

            // Add parameter as "short option"
            if (name.startsWith('-')) {
                this.addShortOption(name.substring(1), value);
                return;
            }
            
            // Otherwise, add parameter as an argument
            this.addArgument(name, value);
        });
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
            this._options.set(name, false);

            return this;
        }
        
        const option = this.definition.getOption(name);
        if (!isset(value)) {
            if (option.isValueRequired()) {
                throw new TypeError(`The "--${name}" option requires a value.`);
            }
            
            if (!option.isValueOptional()) {
                value = true;
            }
        }
        
        this._options.set(name, value);
        
        return this;
    }

    /**
     * Add an argument
     * 
     * @param {string | number} name
     * @param {string | number | boolean | (string | number | boolean)[] | null} value
     * 
     * @return {this}
     * 
     * @throws {TypeError}
     * 
     * @protected
     */
    protected addArgument(name: string|number, value: string | number | boolean | (string|number|boolean)[] | null): this
    {
        if (!this.definition.hasArgument(name)) {
            throw new TypeError(`The "${name}" argument does not exist.`);
        }
        
        // Resolve argument name, in case that an index has been provided.
        name = this.definition.getArgument(name).name;
        
        this._arguments.set(name, value);
        
        return this;
    }
}