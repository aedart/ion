import type {
    Binding,
    FactoryCallback,
    Identifier
} from "@aedart/contracts/container";
import type { Constructor } from "@aedart/contracts";
import { isConstructor } from "@aedart/support/reflections";
import { isBindingIdentifier } from "@aedart/support/container";

/**
 * Binding Entry
 */
export default class BindingEntry<
    T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> implements Binding<T>
{
    /**
     * This binding's identifier
     *
     * @type {Identifier}
     *
     * @readonly
     * 
     * @protected
     */
    protected readonly _identifier: Identifier;

    /**
     * The bound value to be resolved by a service container
     *
     * @template T = any
     *
     * @type {FactoryCallback<T> | Constructor<T>}
     *
     * @readonly
     * 
     * @protected
     */
    protected readonly _value: FactoryCallback<T> | Constructor<T>;

    /**
     * Shared state of resolved value
     *
     * @type {boolean} If `true`, then service container must register resolved
     *                 value as a singleton.
     *
     * @readonly
     * 
     * @protected
     */
    protected readonly _shared: boolean;

    /**
     * State, whether value is a factory callback or not
     * 
     * @type {boolean|null}
     * 
     * @protected
     */
    protected _isFactoryCallback: boolean|null = null;

    /**
     * State, whether value is a constructor or not
     * 
     * @type {boolean|null}
     * 
     * @protected
     */
    _isConstructor: boolean|null = null;
    
    /**
     * Create new Binding Entry instance
     * 
     * @template T = any
     * 
     * @param {Identifier} identifier
     * @param {FactoryCallback<T> | Constructor<T>} value
     * @param {boolean} [shared=false]
     * 
     * @throws {TypeError}
     */
    constructor(identifier: Identifier, value: FactoryCallback<T> | Constructor<T>, shared: boolean = false)
    {
        if (!isBindingIdentifier(identifier)) {
            throw new TypeError(`Invalid binding identifier: ${typeof identifier} is not supported`, { cause: { identifier: identifier, value: value } });
        }
        
        this._identifier = identifier;
        this._value = value;
        this._shared = shared;

        this.resolveIsConstructorOrFactoryCallback();
    }
    
    /**
     * This binding's identifier
     *
     * @type {Identifier}
     *
     * @readonly
     */
    get identifier(): Identifier
    {
        return this._identifier;
    }

    /**
     * The bound value to be resolved by a service container
     *
     * @template T = any
     *
     * @type {FactoryCallback<T> | Constructor<T>}
     *
     * @readonly
     */
    get value(): FactoryCallback<T> | Constructor<T>
    {
        return this._value;
    }

    /**
     * Shared state of resolved value
     *
     * @type {boolean} If `true`, then service container must register resolved
     *                 value as a singleton.
     *
     * @readonly
     */
    get shared(): boolean
    {
        return this._shared;
    }
    
    /**
     * Determine if bound value is a {@link FactoryCallback}
     *
     * @returns {boolean}
     */
    isFactoryCallback(): boolean
    {
        return this._isFactoryCallback as boolean;
    }

    /**
     * Determine if bound value is a {@link Constructor}
     *
     * @returns {boolean}
     */
    isConstructor(): boolean
    {
        return this._isConstructor as boolean;
    }

    /**
     * Resolves the "is constructor" or "is factory callback" values
     * 
     * @return {void}
     * 
     * @protected
     */
    protected resolveIsConstructorOrFactoryCallback(): void
    {
        this._isConstructor = isConstructor(this._value);
        this._isFactoryCallback = !this._isConstructor;
        
        if (!this._isConstructor && !this._isFactoryCallback) {
            throw new TypeError('Binding value must either be a valid constructor or factory callback', { cause: { identifier: this._identifier, value: this._value } });
        }
    }
}