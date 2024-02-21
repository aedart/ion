/**
 * Support Objects identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_OBJECTS: unique symbol = Symbol('@aedart/contracts/support/objects');

/**
 * Properties that are considered dangerous and should be avoided when merging
 * objects or assigning properties.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#description
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html
 * @see https://medium.com/@king.amit95/prototype-pollution-a-deeper-inspection-82a226796966
 * 
 * @type {PropertyKey[]}
 */
export const DANGEROUS_PROPERTIES: PropertyKey[] = [ '__proto__' ];

import Cloneable from "./Cloneable";
export {
    type Cloneable,
}

export * from './merge';
export * from './types';