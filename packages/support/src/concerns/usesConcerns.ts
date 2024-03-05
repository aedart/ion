import type { ConcernConstructor, Container, Owner } from "@aedart/contracts/support/concerns";
import { isConcernsOwner } from "./isConcernsOwner";
import { getContainer } from "./getContainer";

/**
 * Determine if [concerns owner]{@link Owner} uses the given concerns
 * 
 * @param {object|Owner} instance
 * @param {...ConcernConstructor[]} concerns
 * 
 * @return {boolean} `true` if owner uses all given concerns, `false` otherwise.
 */
export function usesConcerns(instance: object|Owner, ...concerns: ConcernConstructor[]): boolean
{
    if (!isConcernsOwner(instance) || concerns.length == 0) {
        return false;
    }
    
    const container: Container = getContainer(instance as Owner);
    for (const concern of concerns){
        if (!container.has(concern)) {
            return false;
        }
    }

    return true;
}