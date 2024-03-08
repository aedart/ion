import { getTargetMetaRepository } from "./getTargetMetaRepository";

/**
 * Determine there is any metadata associated with target
 *
 * @param {object} target
 *
 * @return {boolean}
 */
export function hasAnyTargetMeta(target: object): boolean
{
    return getTargetMetaRepository().hasAny(target);
}