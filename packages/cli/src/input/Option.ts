import type {Option as OptionContract} from "@aedart/contracts/cli";
import { OptionType } from "@aedart/contracts/cli";
import { LogicalError } from "@aedart/support/exceptions";

/**
 * Input Option
 *
 * Adaptation of Symfony Console's `InputOption`
 *
 * @see https://github.com/symfony/console/blob/7.1/Input/InputOption.php
 */
export default class Option implements OptionContract
{
    /**
     * Name of this option
     *
     * @type {string}
     *
     * @protected
     * @readonly
     */
    protected readonly _name: string;

    /**
     * Single character alias for the option
     * 
     * @type {string|undefined}
     * 
     * @protected
     * @readonly
     */
    protected readonly _short: string | undefined;
    
    /**
     * Short description of this option
     *
     * @type {string}
     *
     * @protected
     * @readonly
     */
    protected readonly _description: string;

    /**
     * The value datatype for this option
     * 
     * @type {OptionType}
     * 
     * @protected
     * @readonly
     */
    protected readonly _type: OptionType;
    
    /**
     * If this option is required
     *
     * @type {boolean}
     *
     * @protected
     * @readonly
     */
    protected readonly _required: boolean;

    /**
     * If this option accepts multiple values
     *
     * @type {boolean}
     *
     * @protected
     * @readonly
     */
    protected readonly _isArray: boolean;

    /**
     * Default value of this option
     *
     * @type {string | number | boolean | (string | number | boolean)[] | null}
     *
     * @protected
     */
    protected defaultValue: string | number | boolean | (string|number|boolean)[] | null = null;

    /**
     * Create a new input option instance
     * 
     * @param {string} name
     * @param {string | undefined} [short]
     * @param {OptionType} [type]
     * @param {string} [description]
     * @param {boolean} [required]
     * @param {boolean} [isArray]
     * @param {string | number | boolean | (string | number | boolean)[] | null} [defaultValue]
     */
    public constructor(
        name: string,
        short?: string | undefined,
        type: OptionType = OptionType.BOOLEAN,
        description: string = '',
        required: boolean = false,
        isArray: boolean = false,
        defaultValue?: string | number | boolean | (string|number|boolean)[] | null,
    ) {
        if (name.startsWith('--')) {
            name = name.substring(2);
        }
        
        if (name.length === 0) {
            throw new TypeError('Option name cannot be be empty.')
        }
        
        if (short !== undefined) {
            // Left trim dashes for shortcut.
            if (short.startsWith('-')) {
                short = short.replace(/^(-)+/, '');
            }

            if (short.length === 0) {
                throw new TypeError('Option shortcut cannot be be empty.')
            }
        }
        
        this._name = name;
        this._short = short;
        this._type = type;
        this._description = description;
        this._required = required;
        this._isArray = isArray;
        
        this.setDefault(defaultValue);
    }
    
    /**
     * Name of this option
     *
     * @type {string}
     */
    public get name(): string
    {
        return this._name;
    }

    /**
     * Single character alias for the option
     *
     * @returns {string | undefined}
     */
    public get short(): string | undefined
    {
        return this._short;
    }

    /**
     * Short description of this option
     *
     * @type {string}
     */
    public get description(): string
    {
        return this._description;
    }

    /**
     * The value datatype for this option
     *
     * @type {OptionType}
     */
    public get type(): OptionType
    {
        return this._type;
    }

    /**
     * Determine if this option is required
     *
     * @returns {boolean}
     */
    public isRequired(): boolean
    {
        return this._required;
    }

    /**
     * Opposite of {@link isRequired}
     *
     * @returns {boolean}
     */
    public isOptional(): boolean
    {
        return !this.isRequired();
    }

    /**
     * Determine if this option accepts multiple values
     *
     * @returns {boolean}
     */
    public isArray(): boolean
    {
        return this._isArray;
    }

    /**
     * Set default value of this option
     *
     * @param {string | number | boolean | (string | number | boolean)[] | null} [value]
     *
     * @returns {this}
     */
    public setDefault(value?: string | number | boolean | (string|number|boolean)[] | null): this
    {
        value = value ?? null;

        if (this.isRequired() && value !== null) {
            throw new LogicalError('Cannot set default value for required option');
        }

        if (this.isArray()) {
            if (value === null) {
                value = [];
            } else if (!Array.isArray(value)) {
                throw new TypeError('Default value must be an array, for option of the type "array"');
            }
        }

        this.defaultValue = value;

        return this;
    }

    /**
     * Get the default value of this option
     *
     * @returns {string | number | boolean | (string | number | boolean)[] | null}
     */
    public getDefault(): string | number | boolean | (string|number|boolean)[] | null
    {
        return this.defaultValue;
    }
}