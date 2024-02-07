import type { AbstractConstructor } from "@aedart/contracts";

/**
 * A function that returns an abstract subclass ("Mix-in") of its argument 
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins
 * @see https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * 
 * @example:
 * ```ts
 * const BoxMixin = <T extends AbstractConstructor>(superclass: T) => class extends superclass {
 *      // ...not shown...
 * }
 * ```
 */
export type MixinFunction<
    SuperClass extends AbstractConstructor = object,
    AbstractSubclass extends AbstractConstructor = object
> = (superclass: SuperClass) => AbstractSubclass & SuperClass;