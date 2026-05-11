/**
 * Polyfill Symbol.metadata if it does not exist.
 */
// @ts-expect-error: Symbol.metadata is not yet in the TypeScript Symbol interface
Symbol.metadata ??= Symbol.for('Symbol.metadata');
