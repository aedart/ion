import type { Key } from "@aedart/contracts/support";
import { getMetaRepository } from "./getMetaRepository";

/**
 * Return metadata that matches key, for given target
 *
 * @see getAllMeta
 *
 * @template T
 * @template D=unknown Type of default value
 *
 * @param {object} owner Class that owns metadata
 * @param {Key} key Key or path identifier
 * @param {D} [defaultValue=undefined] Default value to return, in case key does not exist
 *
 * @returns {T | D | undefined}
 */
export function getMeta<T, D = unknown>(owner: object, key: Key, defaultValue?: D): T | D | undefined
{
    return getMetaRepository(owner).get<T, D>(key, defaultValue);
}