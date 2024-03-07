import type { Decorator } from "@aedart/contracts";
import type { Key } from "@aedart/contracts/support";
import type {
    Context,
    MetaCallback
} from "@aedart/contracts/support/meta";
import { getMetaRepository } from "./getMetaRepository";

/**
 * Store value as metadata, for given key.
 *
 * **Note**: _Method is intended to be used as a decorator!_
 * 
 * @example
 * ```js
 * @meta('my-key', 'my-value)
 * class A {}
 * 
 * getMeta(A, 'my-key'); // 'my-value'
 * ```
 * 
 * @see getMeta
 * @see getAllMeta
 *
 * @param {Key | MetaCallback} key Key or path identifier. If callback is given,
 *                                 then its resulting [MetaEntry]{@link import('@aedart/contracts/support/meta').MetaEntry}'s `key`
 *                                 and `value` are stored.
 * @param {unknown} [value] Value to store. Ignored if `key` argument is a callback.
 * 
 * @returns {Decorator}
 */
export function meta(
    key: Key | MetaCallback,
    value?: unknown
): Decorator
{
    return (target: object, context: Context) => {
        return getMetaRepository({}).set(target, context, key, value);
    }
}