import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";

/**
 * Support Concerns identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_CONCERNS: unique symbol = Symbol('@aedart/contracts/support/concerns');

/**
 * @deprecated TODO: This MUST be redesigned, such that each Concern class can provide a list of what to expose
 * 
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
 * @type {symbol}
 */
export const HIDDEN: unique symbol = Symbol('hidden');

/**
 * Symbol used by a [concern class]{@link ConcernConstructor} to indicate what properties
 * and methods can be aliased into a target class.
 *
 * **Note**: _Symbol MUST be used to as name for a "static" method in the desired Concern class._
 *
 * **Example**:
 * ```ts
 * class MyConcern implements Concern
 * {
 *      static [PROVIDES](): PropertyKey[]
 *      {
 *          // ...not shown...
 *      }
 *
 *      // ...remaining not shown...
 * }
 * ```
 * 
 * @type {symbol}
 */
export const PROVIDES : unique symbol = Symbol('concern_provides');

/**
 * Symbol used to define a map of the concern classes to be used by a target class.
 * 
 * @see {MustUseConcerns}
 * 
 * @type {Symbol}
 */
export const CONCERN_CLASSES: unique symbol = Symbol('concern_classes');

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
 * @deprecated TODO: Move this into support/concerns. It is way too implementation specific to belong here.
 * 
 * List of properties and methods that must always remain "hidden" and
 * **NEVER** be aliased into a target class' prototype.
 * 
 * @type {ReadonlyArray<PropertyKey>}
 */
export const ALWAYS_HIDDEN: ReadonlyArray<PropertyKey> = [
    
    ...DANGEROUS_PROPERTIES,
    
    // ----------------------------------------------------------------- //
    // Defined by Concern interface / Abstract Concern:
    // ----------------------------------------------------------------- //
    
    // It is NOT possible, nor advised to attempt to alias a Concern's
    // constructor into a target class.
    'constructor',
    
    // The concernOwner property (getter) shouldn't be aliased either
    'concernOwner',
    
    // If the Concern defines any hidden properties or methods,
    // then such a method will not do any good in a target class.
    HIDDEN,
    
    // The static properties and methods (just in case...)
    PROVIDES,
    'resolvedConcernKeys',
    'removeAlwaysHiddenKeys',
    'rememberConcernKeys',

    // ----------------------------------------------------------------- //
    // Other properties and methods:
    // ----------------------------------------------------------------- //
    
    // In case that a concern class uses other concerns, prevent them
    // from being aliased.
    CONCERNS,
];

import Concern from "./Concern";
import ConcernConstructor from "./ConcernConstructor";
import Configuration from "./Configuration";
import Container from "./Container";
import MustUseConcerns from "./MustUseConcerns";
import Injector from "./Injector";
import ConcernsMap from "./ConcernsMap";
import ConcernsMapConstructor from "./ConcernsMapConstructor";
import Owner from "./Owner";
export {
    type Concern,
    type ConcernConstructor,
    type ConcernsMap,
    type ConcernsMapConstructor,
    type Configuration,
    type Container,
    type Injector,
    type MustUseConcerns,
    type Owner
}

export * from './exceptions/index';

export * from './types';