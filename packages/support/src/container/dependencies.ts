import type { Identifier } from "@aedart/contracts/container";
import { DEPENDENCIES } from "@aedart/contracts/container";
import { targetMeta } from "@aedart/support/meta";

/**
 * Define the dependencies that a target requires
 *
 * **Note**: _Method is intended to be used as a class or method decorator!_
 *
 * @example
 * ```js
 * @dependencies('RockService', 'apiConnection')
 * class Radio {
 * 
 *      @dependencies(RockSong)
 *      play(song)
 * }
 * ```
 * 
 * @param {...Identifier[]} identifiers
 * 
 * @return {ClassDecorator | ClassMethodDecorator}
 */
export function dependencies(...identifiers: Identifier[])
{
    return targetMeta(DEPENDENCIES, identifiers);
}