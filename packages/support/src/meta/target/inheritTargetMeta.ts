import type { ClassMethodDecorator } from "@aedart/contracts";
import type { Context } from "@aedart/contracts/support/meta";
import { getTargetMetaRepository } from "./getTargetMetaRepository";

/**
 * Inherit "target" meta from a base class.
 *
 * **Note**: _Method is intended to be used as a static method decorator!_
 *
 * **Note**: _To be used in situations where you overwrite static methods and wish to inherit
 * "target" meta from the parent method._
 *
 * @see targetMeta
 *
 * @example
 * ```ts
 * class A {
 *      @targetMeta('bar', 'zaz')
 *      static foo() {}
 * }
 *
 * class B extends A {
 *
 *     @inheritTargetMeta()
 *     static foo() {
 *          // ...overwritten static method...//
 *     }
 * }
 *
 * getTargetMeta(B.foo, 'bar'); // 'zaz'
 * ```
 *
 * @returns {ClassMethodDecorator}
 *
 * @throws {MetaError} When decorated element's owner class has no parent, or when no "target" metadata available
 *                     on parent element.
 */
export function inheritTargetMeta(): ClassMethodDecorator
{
    return (target: object, context: Context) => {
        return getTargetMetaRepository().inherit(target, context);
    }
}
