import type { TargetRepository } from "@aedart/contracts/support/meta";
import TargetMetaRepository from "./TargetMetaRepository";

/**
 * Returns a new Target Meta Repository
 * 
 * @return {TargetRepository}
 */
export function getTargetMetaRepository(): TargetRepository
{
    return TargetMetaRepository.make();
}