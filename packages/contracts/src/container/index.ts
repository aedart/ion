/**
 * Container identifier
 *
 * @type {Symbol}
 */
export const CONTAINER: unique symbol = Symbol('@aedart/contracts/container');

/**
 * Dependencies identifier
 * 
 * Symbol is intended to be used as an identifier for when associating binding identifiers
 * or "concrete" dependencies with an element, e.g. a class, class method, function,...etc.
 * 
 * @type {symbol}
 */
export const DEPENDENCIES: unique symbol = Symbol('dependencies');

export type * from './types';