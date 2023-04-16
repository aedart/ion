import MatchExpressionsBuilder from "./MatchExpressionsBuilder";

/**
 * Build a "match" expression to be evaluated.
 *
 * Method is able to match given value against a
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values primitive value}.
 * You may also match using a list of values, or a custom "testing" function.
 * 
 * This method is inspired by {@link https://github.com/tc39/proposal-pattern-matching TC39 pattern matching}.
 * 
 * @template T
 * @template D
 * 
 * @param {unknown} value The value to be matched
 * 
 * @returns {MatchExpressionsBuilder<T, D>}
 * 
 * @example
 * const account = 'Premium';
 * const price = when(account)
 *     .matches('Premium', () => 49.95)
 *     .matches([ 'Small Business', 'Freelancer' ], () => 39.95)
 *     .matches( (v) => v === 'Student', () => 5.95)
 *     .otherwise((v) => { throw new TypeError(`Account type "${v}" is not supported`) })
 *     .evaluate();
 */
export function when<T = unknown, D = unknown>(value: unknown): MatchExpressionsBuilder<T, D>
{
    return new MatchExpressionsBuilder<T, D>(value);
}
