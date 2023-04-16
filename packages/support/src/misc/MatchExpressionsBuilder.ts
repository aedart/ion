import type { Primitive } from "@aedart/contracts";
import type { ValueMatchFunction, MatchHandler } from "@aedart/contracts/support";
import MatchExpression from "./MatchExpression";

/**
 * Match Expressions Builder
 *
 * @template T
 * @template D
 */
export default class MatchExpressionsBuilder<T, D>
{
    /**
     * The value to matched against
     *
     * @type {unknown}
     * @private
     */
    readonly #value: unknown;

    /**
     * List of match expressions
     *
     * @template T
     * @type {MatchExpression<T>[]}
     * @private
     */
    #expressions: MatchExpression<T>[];

    /**
     * The default handler, when value was not matched
     *
     * @returns {(value: unknown) => D | undefined}
     * @private
     */
    #defaultHandler: MatchHandler<D> = () => undefined;

    /**
     * Create a new builder instance
     *
     * @param {unknown} value The value to matched against
     */
    constructor(value: unknown)
    {
        this.#value = value;
        this.#expressions = [];
    }

    /**
     * Add expression to match against the value
     * 
     * @param {Primitive | Primitive[] | ValueMatchFunction | MatchExpression<T>} expression
     * @param {MatchHandler<T>} handler Invoked if expression matches the value in question
     * 
     * @returns {this}
     */
    matches(expression: Primitive | Primitive[] | ValueMatchFunction | MatchExpression<T>, handler: MatchHandler<T>): this
    {
        if (!(expression instanceof MatchExpression)) {
            expression = new MatchExpression(expression, handler);
        }
        
        this.#expressions.push(expression);

        return this;
    }

    /**
     * Set a fallback handler to be invoked, when value is not matched
     * 
     * @param {MatchHandler<D>} handler Invoked if no expression was matched against the value
     * 
     * @returns {this}
     */
    otherwise(handler: MatchHandler<D>): this
    {
        this.#defaultHandler = handler;

        return this;
    }

    /**
     * Evaluate the match expressions
     * 
     * Method invokes matched expressions assigned handler and
     * returns its result. If no expression is matched, then the
     * fallback handler is invoked.
     * 
     * @returns {T | D | undefined}
     */
    evaluate(): T | D | undefined
    {
        const value = this.#value;

        // Find expression (and it's assigned handler) that matches the given value
        const matched: MatchExpression<T> | undefined = this.#expressions.find((expression: MatchExpression<T>) => {
            return expression.matches(value);
        });

        // Invoke assigned expression's handler when match is found
        if (matched !== undefined) {
            return matched.handle(value);
        }

        // Otherwise, invoke the fallback handler
        return this.#defaultHandler(value);
    }
}