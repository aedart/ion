import type { Key } from "@aedart/contracts/support";
import { getTargetMetaRepository } from "./getTargetMetaRepository";

/**
 * Return metadata that matches key, that belongs to the given target
 *
 * **Note**: _Unlike the {@link getMeta} method, this method does not require you
 * to know the owner object (e.g. the class) that holds metadata, provided
 * that metadata has been associated with given target, via {@link targetMeta}._
 *
 * @see targetMeta
 * @see getMeta
 *
 * @template T
 * @template D=unknown Type of default value
 *
 * @param {object} target Class or method that owns metadata
 * @param {Key} key Key or path identifier
 * @param {D} [defaultValue=undefined] Default value to return, in case key does not exist
 *
 * @returns {T | D | undefined}
 */
export function getTargetMeta<T, D = unknown>(target: object, key: Key, defaultValue?: D): T | D | undefined
{
    return getTargetMetaRepository().get<T, D>(target, key, defaultValue);
}
