/**
 * Contracts Support Objects identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_OBJECTS: unique symbol = Symbol('@aedart/contracts/support/objects');

/**
 * Properties that are considered dangerous
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf#description
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html
 * @see https://medium.com/@king.amit95/prototype-pollution-a-deeper-inspection-82a226796966
 */
export const DANGEROUS_PROPERTIES: Record<PropertyKey, boolean> = Object.freeze(
    Object.assign(Object.create(null), {
        ['__proto__']: true,
        ['constructor']: true,
        ['prototype']: true,
    }),
);

import Cloneable from './Cloneable.js';
import Populatable from './Populatable.js';
export { type Cloneable, type Populatable };

export { CLONE } from './Cloneable.js';

export * from './merge/index.js';
export * from './types.js';
