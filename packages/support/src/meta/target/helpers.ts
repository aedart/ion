import { Kind } from "@aedart/contracts/support/meta";

/**
 * Element Kind Identifiers
 *
 * @type {Record<string, symbol>}
 */
export const ELEMENT_KIND_IDENTIFIERS: Record<string, symbol> = {
    [Kind.class]: Symbol('class'),
    [Kind.method]: Symbol('methods'),
    [Kind.getter]: Symbol('getters'),
    [Kind.setter]: Symbol('setters'),
    [Kind.field]: Symbol('fields'),
    [Kind.accessor]: Symbol('accessors'),
};

/**
 * Static element identifier
 *
 * @type {symbol}
 */
export const STATIC_IDENTIFIER: unique symbol = Symbol('static');
