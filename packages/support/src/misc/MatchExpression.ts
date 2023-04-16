import type { Primitive } from "@aedart/contracts";
import type { ValueMatchFunction, MatchHandler } from "@aedart/contracts/support";

/**
 * Match Expression
 *
 * @template T
 */
export default class MatchExpression<T>
{
    /**
     * Value, list of values or test function
     *
     * @type {Primitive | Primitive[] | ValueMatchFunction}
     * @private
     */
    readonly #matchValue: Primitive | Primitive[] | ValueMatchFunction;

    /**
     * The handler to invoke if this expression matches
     *
     * @type {MatchHandler<T>}
     * @private
     */
    readonly #handler: MatchHandler<T>;

    /**
     * Create new match expression instance
     *
     * @param {Primitive | Primitive[] | ValueMatchFunction} valueToMatch
     * @param {MatchHandler<T>} handler
     */
    constructor(valueToMatch: Primitive | Primitive[] | ValueMatchFunction, handler: MatchHandler<T>)
    {
        this.#matchValue = valueToMatch;
        this.#handler = handler;
    }

    /**
     * Determine if this expression matches given value
     *
     * @param {unknown} value
     *
     * @returns {boolean}
     */
    matches(value: unknown): boolean
    {
        // Attempt to match directly, in case of primitive value...
        if (this.#matchValue === value) {
            return true;
        }

        // Match first value in array, if list of primitives is given 
        if (Array.isArray(this.#matchValue)) {
            return this.#matchValue.find((v) => v === value) !== undefined;
        }
        
        // Or... invoke a custom "testing" method
        if (typeof this.#matchValue === 'function') {
            return this.#matchValue(value);
        }

        return false;
    }

    /**
     * Invoke this expression's assigned handler
     *
     * @param {unknown} value
     *
     * @returns {T | undefined}
     */
    handle(value: unknown): T | undefined
    {
        return this.#handler(value);
    }
}