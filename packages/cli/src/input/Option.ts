import {Option as OptionContract, ValueMode} from "@aedart/contracts/cli";
import {LogicalError} from "@aedart/support/exceptions";

/**
 * Input Option
 *
 * Adaptation of Symfony Console's `InputOption` - Copyright Fabien Potencier 2004-present, MIT License.
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
     * The value mode of this option
     * 
     * @type {ValueMode}
     * 
     * @protected
     * @readonly
     */
    protected readonly _valueMode: ValueMode;
    
    /**
     * If this option's value is negatable
     * 
     * @type {boolean}
     * 
     * @protected
     * @readonly
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
     * @param {string | undefined} [short]
     * @param {ValueMode} [mode]
     * @param {string} [description]
     * @param {boolean} [negatable=false]
     * @param {boolean} [isArray=false]
     * @param {string | number | boolean | (string | number | boolean)[] | null} [defaultValue]
     */
    public constructor(
        name: string,
        short?: string | undefined,
        mode: ValueMode = ValueMode.NONE,
        description: string = '',
        negatable: boolean = false,
        isArray: boolean = false,
        defaultValue?: string | number | boolean | (string|number|boolean)[] | null,
    ) {
        this._name = this.resolveName(name);
        this._short = this.resolveShortcut(short);
        this._valueMode = this.resolveValueMode(mode);
        this._description = description;
        this._negatable = this.resolveNegatable(negatable);
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
     * The value mode of this option
     *
     * @type {ValueMode}
     */
    public get valueMode(): ValueMode
    {
        return this._valueMode;
    }
    
    /**
     * Determine if option accepts a value when used
     *
     * @return {boolean}
     */
    public acceptsValue(): boolean
    {
        return this.isValueRequired() || this.isValueOptional();
    }
    
    /**
     * Determine if value is required, when option is used
     *
     * @returns {boolean}
     */
    public isValueRequired(): boolean
    {
        return this.valueMode == ValueMode.REQUIRED;
    }

    /**
     * Determine if value is optional, when option is used
     *
     * @returns {boolean}
     */
    public isValueOptional(): boolean
    {
        return this.valueMode == ValueMode.OPTIONAL;
    }

    /**
     * Determine if option allows passing a negated variant, e.g. --ansi or --no-ansi
     *
     * @return {boolean}
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
        
        if (this.valueMode === ValueMode.NONE && value !== null) {
            throw new LogicalError('Cannot set default value when using ValueMode.NONE');
        }

        if (this.isArray()) {
            if (value === null) {
                value = [];
            } else if (!Array.isArray(value)) {
                throw new TypeError('Default value must be an array, for option of the type "array"');
            }
        }

        this.defaultValue = this.acceptsValue() || this.isNegatable()
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

    /**
     * Resolve option name
     *
     * @param {string} name
     * 
     * @return {string}
     *
     * @throws {TypeError}
     * 
     * @protected
     */
    protected resolveName(name: string): string
    {
        if (name.startsWith('--')) {
            name = name.substring(2);
        }

        if (name.length === 0) {
            throw new TypeError('Option name cannot be be empty.')
        }

        return name;
    }

    /**
     * Resolves option shortcut
     *
     * @param {string | undefined} [short]
     * 
     * @return {string | undefined}
     *
     * @throws {TypeError}
     * 
     * @protected
     */
    protected resolveShortcut(short?: string | undefined): string | undefined
    {
        if (short === undefined) {
            return short;
        }

        // Left trim dashes for shortcut.
        if (short.startsWith('-')) {
            short = short.replace(/^(-)+/, '');
        }

        if (short.length === 0) {
            throw new TypeError('Option shortcut cannot be be empty.')
        }

        return short;
    }

    /**
     * Resolve value mode
     *
     * @param {any} mode
     *
     * @return {ValueMode}
     *
     * @throws {TypeError}
     *
     * @protected
     */
    protected resolveValueMode(
        mode: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): ValueMode
    {
        if (!Object.values(ValueMode).includes(mode as ValueMode)) {
            throw TypeError('Invalid option value mode');
        }

        return mode as ValueMode;
    }

    /**
     * Resolve negatable
     * 
     * @param {boolean} value
     * @return {boolean}
     *
     * @throws {TypeError}
     * 
     * @protected
     */
    protected resolveNegatable(value: boolean): boolean
    {
        if (value && this.acceptsValue()) {
            throw TypeError('Option value cannot be negatable and also accept a value');
        }
        
        return value;
    }
}