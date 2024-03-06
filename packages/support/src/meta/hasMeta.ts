import type { Key } from "@aedart/contracts/support";
import { getMetaRepository } from "./getMetaRepository";

/**
 * Determine if owner has metadata for given key
 * 
 * @param {object} owner
 * @param {Key} key
 * 
 * @return {boolean}
 */
export function hasMeta(owner: object, key: Key): boolean
{
    return getMetaRepository(owner).has(key);
}