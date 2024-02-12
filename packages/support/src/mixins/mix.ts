import type {ConstructorOrAbstractConstructor} from "@aedart/contracts";
import Builder from "./Builder";

/**
 * Mix superclass with one or more abstract subclasses ("Mixins")
 *
 * **example**:
 * ```ts
 * const BoxMixin = <T extends AbstractConstructor>(superclass: T) => class extends superclass {
 *      // ...not shown...
 * }
 *
 * class A extends mix().with(
 *      BoxMixin
 * ) {
 *      // ...not shown...
 * }
 * ```
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins
 * @see https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * @see https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/
 * 
 * @template T = object
 * 
 * @param {ConstructorOrAbstractConstructor<T>} [superclass=class {}]
 * 
 * @return {Builder<T>} New Mixin Builder instance
 */
export function mix<T = object>(superclass:ConstructorOrAbstractConstructor<T> = class {}): Builder<T>
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return new Builder<T>(superclass);
}