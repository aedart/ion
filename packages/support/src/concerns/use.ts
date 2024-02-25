import {
    Concern,
    Configuration
} from "@aedart/contracts/support/concerns";
import type { Constructor } from "@aedart/contracts";
import ConcernsInjector from "./ConcernsInjector";

/**
 * Injects the given concern classes into target class
 *
 * **Note**: _Method is intended to be used as a decorator!_
 * 
 * **Example**:
 * ```
 * @use(
 *      MyConcernA,
 *      MyConcernB,
 *      MyConcernC,
 * )
 * class MyClass {}
 * ```
 * 
 * @see Injector
 * 
 * @template C = {@link Concern}
 * 
 * @param {...Constructor<C> | Configuration<C>} concerns
 * 
 * @returns {(target: object) => UsesConcerns<object>}
 * 
 * @throws {InjectionException}
 */
export function use<C = Concern>(...concerns: (Constructor<C>|Configuration<C>)[])
{
    return (target: object) => {
        return (new ConcernsInjector<typeof target>(target)).inject(...concerns);
    }
}