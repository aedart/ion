import type { Constructor } from "../../types.js";

/**
 * A function that returns an abstract subclass ("Mix-in") of its argument 
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins
 * @see https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * 
 * @example:
 * ```ts
 * const BoxMixin = <T extends Constructor>(superclass: T) => class extends superclass {
 *      // ...not shown...
 * }
 * ```
 */
export type MixinFunction<
    SuperClass extends Constructor = Constructor,
    AbstractSubclass extends Constructor = Constructor
> = (superclass: SuperClass) => AbstractSubclass & SuperClass;