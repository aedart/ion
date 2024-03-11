import type { ConstructorLike } from "@aedart/contracts";
import { getNameOrDesc } from "@aedart/support/reflections";
import { isConcernsOwner } from "./isConcernsOwner";

/**
 * Assert that given instance is of the type [Concerns Owner]{@link import('@aedart/contracts/support/concerns').Owner}
 * 
 * @see isConcernsOwner
 * 
 * @param {object} instance
 * 
 * @throws {TypeError} If `instance` is not of the type [Concerns Owner]{@link import('@aedart/contracts/support/concerns').Owner}
 */
export function assertIsConcernsOwner(instance: object): void
{
    if (!isConcernsOwner(instance)) {
        const msg: string = `${getNameOrDesc(instance as ConstructorLike)} is not a concerns owner`;
        throw new TypeError(msg, { cause: { instance: instance } });
    }
}