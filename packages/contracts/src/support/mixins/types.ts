import type {Constructor, AbstractConstructor} from "@aedart/contracts";

/**
 * Class decorator (Mixin)
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
    MixinClass extends Constructor = object
> = (superclass: SuperClass) => SuperClass & MixinClass;