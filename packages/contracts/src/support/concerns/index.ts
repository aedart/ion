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
 * @see ConcernConstructor
 * 
 * @type {symbol}
 */
export const PROVIDES : unique symbol = Symbol('concern_provides');

/**
 * Symbol that can be used by a [concern class]{@link ConcernConstructor} to perform
 * pre-registration logic
 * 
 * @see RegistrationAware
 * @see ConcernConstructor
 * 
 * @type {symbol}
 */
export const BEFORE: unique symbol = Symbol('concern_before_registration');

/**
 * Symbol that can be used by a [concern class]{@link ConcernConstructor} to perform
 * post-registration logic.
 *
 * @see RegistrationAware
 * @see ConcernConstructor
 *
 * @type {symbol}
 */
export const AFTER: unique symbol = Symbol('concern_after_registration');

/**
 * Symbol used to define a list of the concern classes to be used by a target class.
 * 
 * @see {UsesConcerns}
 * 
 * @type {Symbol}
 */
export const CONCERN_CLASSES: unique symbol = Symbol('concern_classes');

/**
 * Symbol used to list the aliases applied in a target class
 *
 * @see {UsesConcerns}
 *
 * @type {Symbol}
 */
export const ALIASES: unique symbol = Symbol('aliases');

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
import DescriptorsCache from "./DescriptorsCache";
import Factory from "./Factory";
import Injector from "./Injector";
import RegistrationAware from "./RegistrationAware";
import Owner from "./Owner";
import AliasDescriptorFactory from "./AliasDescriptorFactory";
import UsesConcerns from "./UsesConcerns";
export {
    type Concern,
    type ConcernConstructor,
    type Configuration,
    type Container,
    type DescriptorsCache,
    type Factory,
    type Injector,
    type RegistrationAware,
    type Owner,
    type AliasDescriptorFactory,
    type UsesConcerns
}

export * from './exceptions/index';
export * from './types';