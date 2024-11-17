import type { Argument as ArgumentContract } from "@aedart/contracts/cli";
import { LogicalError } from "@aedart/support/exceptions";

/**
 * Input Argument
 * 
 * Adaptation of Symfony Console's `InputArgument`
 * 
 * @see https://github.com/symfony/console/blob/7.1/Input/InputArgument.php
 */
export default class Argument implements ArgumentContract
{
    /**
     * Name of this argument
     * 
     * @type {string}
     * 
     * @protected
     * @readonly
     */
    protected readonly _name: string;

    /**
     * Short description of this argument
     * 
     * @type {string}
     * 
     * @protected
     * @readonly
     */
    protected readonly _description: string;

    /**
     * If this argument is required
     * 
     * @type {boolean}
     * 
     * @protected
     * @readonly
     */
    protected readonly _required: boolean;

    /**
     * If this argument accepts multiple values
     * 
     * @type {boolean}
     * 
     * @protected
     * @readonly
     */
    protected readonly _isArray: boolean;

    /**
     * Default value of this argument
     * 
     * @type {string | number | boolean | (string | number | boolean)[] | null}
     * 
     * @protected
     */
    protected defaultValue: string | number | boolean | (string|number|boolean)[] | null = null;

    /**
     * Create a new input argument instance
     * 
     * @param {string} name
     * @param {string} [description]
     * @param {boolean} [required]
     * @param {boolean} [isArray]
     * @param {string | number | boolean | (string | number | boolean)[] | null} [defaultValue]
     */
    public constructor(
        name: string,
        description: string = '',
        required: boolean = true,
        isArray: boolean = false,
        defaultValue?: string | number | boolean | (string|number|boolean)[] | null,
    ) {
        this._name = name;
        this._description = description;
        this._required = required;
        this._isArray = isArray;
        
        this.setDefault(defaultValue);
    }
    
    /**
     * Name of this argument
     *
     * @type {string}
     */
    public get name(): string
    {
        return this._name;
    }

    /**
     * Short description of this argument
     *
     * @type {string}
     */
    public get description(): string
    {
        return this._description;
    }

    /**
     * Determine if this argument is required
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
     * Determine if this argument accepts multiple values
     *
     * @returns {boolean}
     */
    public isArray(): boolean
    {
        return this._isArray;
    }

    /**
     * Set default value of this argument
     *
     * @param {string | number | boolean | (string | number | boolean)[] | null} [value]
     *
     * @returns {this}
     * 
     * @throws {LogicalError}
     */
    public setDefault(value?: string | number | boolean | (string|number|boolean)[] | null): this
    {
        value = value ?? null;
        
        if (this.isRequired() && value !== null) {
            throw new LogicalError('Cannot set default value for required argument');
        }
        
        if (this.isArray()) {
            if (value === null) {
                value = [];
            } else if (!Array.isArray(value)) {
                throw new TypeError('Default value must be an array, for argument of the type "array"');
            }
        }
        
        this.defaultValue = value;
        
        return this;
    }

    /**
     * Get the default value of this argument
     *
     * @returns {string | number | boolean | (string | number | boolean)[] | null}
     */
    public getDefault(): string | number | boolean | (string|number|boolean)[] | null
    {
        return this.defaultValue;
    }
}