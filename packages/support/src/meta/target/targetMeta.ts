import type {
    ClassDecorator,
    ClassMethodDecorator
} from "@aedart/contracts";
import type { Key } from "@aedart/contracts/support";
import type {
    Context,
    MetaCallback,
} from "@aedart/contracts/support/meta";
import { getTargetMetaRepository } from "./getTargetMetaRepository";

/**
 * Stores value for given key, and associates it directly with the target
 *
 * **Note**: _Method is intended to be used as a class or method decorator!_
 *
 * @example
 * ```ts
 * class A {
 *      @targetMeta('my-key', 'my-value')
 *      foo() {}
 * }
 * 
 * const a: A = new A();
 * getTargetMeta(a.foo, 'my-key'); // 'my-value'
 * ```
 *
 * @see getTargetMeta
 *
 * @param {Key | MetaCallback} key Key or path identifier. If callback is given,
 *                                 then its resulting [MetaEntry]{@link import('@aedart/contracts/support/meta').MetaEntry}'s `key`
 *                                 and `value` are stored.
 * @param {unknown} [value] Value to store. Ignored if `key` argument is
 *                          a callback.
 * @returns {ClassDecorator | ClassMethodDecorator}
 * 
 * @throws {MetaError} When decorated element is not supported
 */
export function targetMeta(
    key: Key | MetaCallback,
    value?: unknown
): ClassDecorator | ClassMethodDecorator 
{
    return (target: object, context: Context) => {
        return getTargetMetaRepository().set(target, context, key, value);
    }
}
