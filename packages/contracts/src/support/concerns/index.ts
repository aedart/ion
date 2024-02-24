/**
 * Support Concerns identifier
 *
 * @type {Symbol}
 */
export const SUPPORT_CONCERNS: unique symbol = Symbol('@aedart/contracts/support/concerns');

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
 * Symbol used to define a list of the concern classes to be used by a target class.
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

import Concern from "./Concern";
import ConcernConstructor from "./ConcernConstructor";
import Configuration from "./Configuration";
import Container from "./Container";
import Factory from "./Factory";
import MustUseConcerns from "./MustUseConcerns";
import Injector from "./Injector";
import Owner from "./Owner";
export {
    type Concern,
    type ConcernConstructor,
    type Configuration,
    type Container,
    type Factory,
    type Injector,
    type MustUseConcerns,
    type Owner
}

export * from './exceptions/index';
export * from './types';