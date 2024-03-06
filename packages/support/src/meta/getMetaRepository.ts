import type { Repository } from "@aedart/contracts/support/meta";
import MetaRepository from "./MetaRepository";

/**
 * Returns [Meta Repository]{@link Repository} for given owner
 * 
 * @param {object} owner
 * 
 * @return {Repository}
 */
export function getMetaRepository(owner: object): Repository
{
    return MetaRepository.make(owner);
}