import Concern from "./Concern";
import Configuration from "./Configuration";

/**
 * Support Concerns identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_CONCERNS: unique symbol = Symbol('@aedart/contracts/support/concerns');

/**
 * Symbol used by a {@link Concern} to define properties or methods that must be
 * "hidden" and not allowed to be aliased into a target class.
 * 
 * @type {Symbol}
 */
export const HIDDEN: unique symbol = Symbol('hidden');

/**
 * List of properties and methods that must always remain "hidden" and
 * NEVER be aliased into a target class.
 * 
 * @type {ReadonlyArray<PropertyKey>}
 */
export const ALWAYS_HIDDEN: ReadonlyArray<PropertyKey> = [
    // It is NOT possible, nor advised to attempt to alias a Concern's
    // constructor into a target class.
    'constructor',
    
    // The concernOwner property (getter) will not work either...
    'concernOwner',
    
    // Lastly, if the Concern defines any hidden properties or methods,
    // then such a method will not do any good in a target class.
    HIDDEN
];

export {
    type Concern,
    type Configuration
}

export * from './types';