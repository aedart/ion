import type { ConcernConstructor, Container, Owner } from "@aedart/contracts/support/concerns";
import { isConcernsOwner } from "./isConcernsOwner";
import { getConcernsContainer } from "./getConcernsContainer";

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
    
    const container: Container = getConcernsContainer(instance);
    for (const concern of concerns){
        if (!container.has(concern)) {
            return false;
        }
    }

    return true;
}