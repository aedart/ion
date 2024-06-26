import type {
    ConcernConstructor,
    Configuration,
    ShorthandConfiguration
} from "@aedart/contracts/support/concerns";
import ConcernsInjector from "./ConcernsInjector";

/**
 * Injects the concern classes into the target class
 *
 * **Note**: _Method is intended to be used as a class decorator!_
 * 
 * **Example**:
 * ```
 * @use(
 *      MyConcernA,
 *      MyConcernB,
 *      { concern: MyConcernC, aliases: { 'foo': 'bar' } },
 * )
 * class MyClass {}
 * ```
 * 
 * @see Injector
 * @see ConcernConstructor
 * @see Configuration
 * @see UsesConcerns
 * 
 * @template T = object
 * 
 * @param {...Constructor | Configuration | ShorthandConfiguration} concerns
 * 
 * @returns {(target: T) => UsesConcerns<T>}
 * 
 * @throws {InjectionException}
 */
export function use(...concerns: (ConcernConstructor|Configuration|ShorthandConfiguration)[]): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    return (target: object) => {
        return (new ConcernsInjector<typeof target>(target)).inject(...concerns);
    }
}