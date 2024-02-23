import { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import ConcernConstructor from "./ConcernConstructor";

/**
 * Concern Classes Map
 */
export default interface ConcernsMap
{
    /**
     * The amount of concern classes in this map
     *
     * @readonly
     *
     * @type {number}
     */
    readonly size: number;
    
    /**
     * Determine if concern class is registered in this map
     * 
     * @param {ConcernConstructor} concern
     */
    has(concern: ConcernConstructor): boolean;

    /**
     * Determine if this map is empty
     *
     * @return {boolean}
     */
    isEmpty(): boolean;

    /**
     * Opposite of {@link isEmpty}
     *
     * @return {boolean}
     */
    isNotEmpty(): boolean;

    /**
     * Returns all concern constructor - target class pairs in this map
     * 
     * @return {IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>}
     */
    [Symbol.iterator](): IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>;

    /**
     * Returns all concern constructor - target class pairs in this map
     *
     * @return {IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>}
     */
    all(): IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>;

    /**
     * Returns all concern classes registered in this map
     * 
     * @return {IterableIterator<ConcernConstructor>}
     */
    concerns(): IterableIterator<ConcernConstructor>;

    /**
     * Returns all target classes registered in this map
     * 
     * @return {IterableIterator<ConstructorOrAbstractConstructor>}
     */
    classes(): IterableIterator<ConstructorOrAbstractConstructor>;

    /**
     * Merge this map with another concerns classes map
     * 
     * @param {ConcernsMap} map
     * 
     * @return {ConcernsMap} New Concern Classes Map instance
     * 
     * @throws {InjectionException} If entries from given map already exist in this map.
     */
    merge(map: ConcernsMap): ConcernsMap;
}