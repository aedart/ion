import type { MetadataRecord } from "@aedart/contracts/support/meta";
import { getMetaRepository } from "./getMetaRepository";

/**
 * Returns all registered metadata for given target, if available
 *
 * @see getMeta
 *
 * @param {object} owner Class that owns metadata
 *
 * @returns {Readonly<MetadataRecord>}
 */
export function getAllMeta(owner: object): Readonly<MetadataRecord>
{
    return getMetaRepository(owner).all();
}