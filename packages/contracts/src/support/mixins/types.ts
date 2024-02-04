import type { AbstractConstructor } from "@aedart/contracts";

/**
 * Abstract subclass or "Mix-in"
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins
 * 
 * @example:
 * ```ts
 * const BoxMixin = <T extends AbstractConstructor>(superclass: T) => class extends superclass {
 *      // ...not shown...
 * }
 * ```
 */
export type Mixin<
    SuperClass extends AbstractConstructor = object,
    AbstractSubclass extends AbstractConstructor = object
> = (superclass: SuperClass) => AbstractSubclass & SuperClass;