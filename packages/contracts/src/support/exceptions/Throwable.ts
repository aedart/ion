/**
 * Throwable
 * 
 * Base interface for a custom {@link Error} that can be thrown.
 * 
 * This interface is inspired by PHP's [`Throwable` interface]{@link https://www.php.net/manual/en/class.throwable.php}.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 * @see Error
 */
export default interface Throwable extends Error {}