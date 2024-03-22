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
export default class BindingEntry<T = any> implements Binding<T>
{
    /**
     * This binding's identifier
     *
     * @type {Identifier}
     *
     * @readonly
     */
    readonly #identifier: Identifier;

    /**
     * The bound value to be resolved by a service container
     *
     * @template T = any
     *
     * @type {FactoryCallback<T> | Constructor<T>}
     *
     * @readonly
     */
    readonly #value: FactoryCallback<T> | Constructor<T>;

    /**
     * Shared state of resolved value
     *
     * @type {boolean} If `true`, then service container must register resolved
     *                 value as a singleton.
     *
     * @readonly
     */
    readonly #shared: boolean;

    /**
     * State, whether value is a factory callback or not
     * 
     * @type {boolean|null}
     * 
     * @private
     */
    #isFactoryCallback: boolean|null = null;

    /**
     * State, whether value is a constructor or not
     * 
     * @type {boolean|null}
     * 
     * @private
     */
    #isConstructor: boolean|null = null;
    
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
        
        this.#identifier = identifier;
        this.#value = value;
        this.#shared = shared;

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
        return this.#identifier;
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
        return this.#value;
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
        return this.#shared;
    }
    
    /**
     * Determine if bound value is a {@link FactoryCallback}
     *
     * @returns {boolean}
     */
    isFactoryCallback(): boolean
    {
        return this.#isFactoryCallback as boolean;
    }

    /**
     * Determine if bound value is a {@link Constructor}
     *
     * @returns {boolean}
     */
    isConstructor(): boolean
    {
        return this.#isConstructor as boolean;
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
        this.#isConstructor = isConstructor(this.#value);
        this.#isFactoryCallback = !this.#isConstructor;
        
        if (this.#isConstructor === false && this.#isFactoryCallback === false) {
            throw new TypeError('Binding value must either be a valid constructor or factory callback', { cause: { identifier: this.#identifier, value: this.#value } });
        }
    }
}