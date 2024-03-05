import type { Container, Owner } from "@aedart/contracts/support/concerns";
import { CONCERNS } from "@aedart/contracts/support/concerns";

/**
 * Returns [owner's]{@link Owner} [concerns container]{@link Container}
 * 
 * **Caution**: _Method expects that given `owner` is type {@link Owner}!_
 * 
 * @see getConcernsContainer
 * 
 * @param {Owner} owner
 * 
 * @return {Container}
 */
export function getContainer(owner: Owner): Container
{
    return owner[CONCERNS];
}