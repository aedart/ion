import type { Container, Owner } from "@aedart/contracts/support/concerns";
import { assertIsConcernsOwner } from "./assertIsConcernsOwner";
import { getContainer } from "./getContainer";

/**
 * Returns [owner's]{@link Owner} [concerns container]{@link Container}
 * 
 * @see assertIsConcernsOwner
 * @see getContainer
 * 
 * @param {object|Owner} instance
 * 
 * @return {Container}
 * 
 * @throws {TypeError} If `instance` is not a [concerns owner]{@link Owner}
 */
export function getConcernsContainer(instance: object|Owner): Container
{
    assertIsConcernsOwner(instance);
    
    return getContainer(instance as Owner);
}