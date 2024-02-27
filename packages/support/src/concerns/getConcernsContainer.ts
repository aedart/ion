import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import type { Container, Owner } from "@aedart/contracts/support/concerns";
import { isConcernsOwner } from "./isConcernsOwner";
import { getNameOrDesc } from "@aedart/support/reflections";
import { getContainer } from "./getContainer";

/**
 * Returns [owner's]{@link Owner} [concerns container]{@link Container}
 * 
 * @see isConcernsOwner
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
    if (!isConcernsOwner(instance)) {
        const msg: string = `${getNameOrDesc(instance as ConstructorOrAbstractConstructor)} is not a concerns owner`;
        throw new TypeError(msg, { cause: { instance: instance } });
    }
    
    return getContainer(instance as Owner);
}