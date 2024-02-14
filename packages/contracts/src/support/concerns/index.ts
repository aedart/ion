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
 * **Note**: _Symbol MUST be used to as name for a "static" method in the desired Concern class._
 * 
 * **Example**:
 * ```ts
 * class MyConcern implements Concern
 * {
 *      static [HIDDEN](): PropertyKey[]
 *      {
 *          // ...not shown...
 *      }
 *      
 *      // ...remaining not shown...
 * }
 * ```
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

import Concern from "./Concern";
import Configuration from "./Configuration";
import Injector from "./Injector";
export {
    type Concern,
    type Configuration,
    type Injector
}

export * from './types';