import type {
    Option as OptionContract,
    OptionType,
    OptionParams
} from "@aedart/contracts/cli";
import { empty } from "@aedart/support/misc";
import { isset } from "@aedart/support/misc";
import { LogicalError } from "@aedart/support/exceptions";

/**
 * Input Option
 *
 * @see {import('@aedart/contracts/cli').Option}
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
     * @type {string | null}
     * @protected
     */
    protected readonly _short: string | null = null;
    
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
     * Value datatype for this option
     * 
     * @type {OptionType}
     * @protected
     */
    protected readonly _type: OptionType;
    
    /**
     * If this option requires a value
     *
     * @type {boolean}
     *
     * @protected
     * @readonly
     */
    protected readonly _valueRequired: boolean;

    /**
     * If option is negatable
     * 
     * @type {boolean}
     * @protected
     */
    protected readonly _negatable: boolean;
    
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
     * @param {string} [description]
     * @param {string | null} [short]
     * @param {OptionType} [type]
     * @param {boolean} [valueRequired]
     * @param {boolean} [negatable]
     * @param {boolean} [isArray]
     * @param {string | number | boolean | (string | number | boolean)[] | null} [defaultValue]
     * 
     * @throws {TypeError}
     */

    /**
     * 
     * @param {string} name
     * @param {OptionParams} [params]
     */
    public constructor(
        name: string,
        params: OptionParams = {
            description: '',
            short: null,
            type: 'boolean',
            valueRequired: false,
            negatable: false,
            isArray: false,
            defaultValue: null,
        },
    )
    {
        if (!isset(name) || empty(name)) {
            throw new TypeError('Option must have a name');
        }
        
        if (isset(params.short) && (params.short as string)?.length > 1) {
            throw new TypeError(`Option "${name}"'s short alias must not exceed more than 1 character`);
        }

        this._name = name;
        this._description = params.description;
        this._short = params.short;
        this._type = params.type;
        this._valueRequired = params.valueRequired;
        this._negatable = params.negatable;
        this._isArray = params.isArray;
        
        if (this.isArray() && !this.acceptsValue()) {
            throw new LogicalError(`Option "${name}" must accept values, if it allows multiple values`);
        }
        
        if (this.isNegatable() && this.acceptsValue()) {
            throw new LogicalError(`Option "${name}" cannot be negatable and accept values`);
        }
        
        this.setDefault(params.defaultValue);
    }

    /**
     * Create a new input option instance
     * 
     * @param {string} name
     * @param {OptionParams} [params]
     * 
     * @returns {OptionContract|this}
     * 
     * @throws {TypeError}
     */
    public static make(
        name: string,
        params: OptionParams = {
            description: '',
            short: null,
            type: 'boolean',
            valueRequired: false,
            negatable: false,
            isArray: false,
            defaultValue: null,
        },
    ): OptionContract
    {
        return new this(name, params);
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
     * @type {string | null}
     */
    public get short(): string | null
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
     * Determine if this option accepts a value
     *
     * @returns {boolean} True if option requires a value
     */
    public acceptsValue(): boolean
    {
        return this.isValueRequired() || this.type !== 'boolean';
    }

    /**
     * Determine if this option requires a value
     *
     * @returns {boolean}
     */
    public isValueRequired(): boolean
    {
        return this._valueRequired;
    }

    /**
     * Opposite of {@link isValueRequired}
     *
     * @returns {boolean}
     */
    public isValueOptional(): boolean
    {
        return !this.isValueRequired();
    }

    /**
     * Determine if option is negatable
     *
     * **Note**: _If `true`, allows explicitly setting boolean
     * option to `false` by prefixing the option name with `--no-`,
     * e.g. `--no-print`_
     *
     * @returns {boolean}
     */
    public isNegatable(): boolean
    {
        return this._negatable;
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
     *
     * @throws {LogicalError}
     * @throws {TypeError}
     */
    public setDefault(value?: string | number | boolean | (string|number|boolean)[] | null): this
    {
        value = value ?? null;

        // TODO: Fail is does not accept values and default is not null
        
        
        if (this.isArray()) {
            if (value === null) {
                value = [];
            } else if (!Array.isArray(value)) {
                throw new TypeError('Default value must be an array, for option of the type "array"');
            }
        }   
        
        this.defaultValue = (this.acceptsValue() || this.isNegatable())
            ? value
            : false;
        
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