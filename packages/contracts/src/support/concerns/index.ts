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
 * Symbol used to define a "concerns container" property inside a target class' prototype
 *
 * @see {Owner}
 * @see {Container}
 *
 * @type {Symbol}
 */
export const CONCERNS: unique symbol = Symbol('concerns');

/**
 * List of properties and methods that must always remain "hidden" and
 * **NEVER** be aliased into a target class' prototype.
 * 
 * @type {ReadonlyArray<PropertyKey>}
 */
export const ALWAYS_HIDDEN: ReadonlyArray<PropertyKey> = [
    // ----------------------------------------------------------------- //
    // Defined by Concern interface / Abstract Concern:
    // ----------------------------------------------------------------- //
    
    // It is NOT possible, nor advised to attempt to alias a Concern's
    // constructor into a target class.
    'constructor',
    
    // The concernOwner property (getter) will not work either...
    'concernOwner',
    
    // If the Concern defines any hidden properties or methods,
    // then such a method will not do any good in a target class.
    HIDDEN,

    // ----------------------------------------------------------------- //
    // Other properties and methods:
    // ----------------------------------------------------------------- //
    
    // In case that a concern class uses other concerns, prevent them
    // from being aliased.
    CONCERNS,
];

import Concern from "./Concern";
import Configuration from "./Configuration";
import Container from "./Container";
import Injector from "./Injector";
import Owner from "./Owner";
export {
    type Concern,
    type Configuration,
    type Container,
    type Injector,
    type Owner
}

export * from './types';