import type {Constructor, AbstractConstructor} from "@aedart/contracts";

/**
 * Class Decorator (mixin)
 * 
 * A function that is able to decorate the given superclass argument.
 * 
 * @example:
 * ```ts
 * const BoxMixin = <T extends AbstractConstructor>(superclass: T) => class extends superclass {
 *      // ...not shown...
 * }
 * ```
 */
export type ClassDecorator<
    SuperClass extends AbstractConstructor = object,
    MixinClass extends Constructor = object
> = (superclass: SuperClass) => Constructor<SuperClass & MixinClass>;