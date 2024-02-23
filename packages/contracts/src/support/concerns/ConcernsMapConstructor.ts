import { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import ConcernsMap from './ConcernsMap';
import ConcernConstructor from "./ConcernConstructor";

/**
 * Concerns Classes Map Constructor
 * 
 * @see ConcernsMap
 */
export default interface ConcernsMapConstructor
{
    /**
     * Create a new Concern Classes Map instance
     * 
     * @param {[ConcernConstructor, ConstructorOrAbstractConstructor][]} entries Key-value pair
     *
     * @throws {InjectionException} If an already added concern constructor is attempted added again.
     */
    new (entries: [ConcernConstructor, ConstructorOrAbstractConstructor][]): ConcernsMap;
}