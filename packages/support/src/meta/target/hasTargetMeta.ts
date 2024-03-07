import type { Key } from "@aedart/contracts/support";
import { getTargetMetaRepository } from "./getTargetMetaRepository";

/**
 * Determine if value exists for key, in given target
 * 
 * @param {object} target
 * @param {Key} key
 * 
 * @return {boolean}
 */
export function hasTargetMeta(target: object, key: Key): boolean
{
    return getTargetMetaRepository().has(target, key);
}