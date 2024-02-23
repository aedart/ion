import type {ConcernConstructor, ConcernsMap, ConcernsMapConstructor} from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts/types";
import {InjectionError} from "@aedart/support/concerns/exceptions";

/**
 * Concern Classes Map
 * 
 * @see ConcernsMap
 */
export default class ConcernClassesMap implements ConcernsMap {

    /**
     * Map of the concern classes and the target classes that must use them
     * 
     * @private
     * @readonly
     * 
     * @type {Map<ConcernConstructor, ConstructorOrAbstractConstructor>}
     */
    readonly #map: Map<ConcernConstructor, ConstructorOrAbstractConstructor>;
    
    /**
     * Create a new Concern Classes Map instance
     *
     * @param {[ConcernConstructor, ConstructorOrAbstractConstructor][]} entries Key-value pair
     *
     * @throws {InjectionException} If an already added concern constructor is attempted added again.
     */
    public constructor(entries: [ConcernConstructor, ConstructorOrAbstractConstructor][])
    {
        this.#map = new Map<ConcernConstructor, ConstructorOrAbstractConstructor>();
        
        this.#addEntries(entries);
    }
    
    /**
     * The amount of concern classes in this map
     *
     * @readonly
     *
     * @type {number}
     */
    public get size(): number
    {
        return this.#map.size;
    }

    /**
     * Determine if concern class is registered in this map
     *
     * @param {ConcernConstructor} concern
     */
    public has(concern: ConcernConstructor): boolean
    {
        return this.#map.has(concern);
    }

    /**
     * Determine if this map is empty
     *
     * @return {boolean}
     */
    public isEmpty(): boolean
    {
        return this.size === 0;
    }

    /**
     * Opposite of {@link isEmpty}
     *
     * @return {boolean}
     */
    public isNotEmpty(): boolean
    {
        return !this.isEmpty();
    }

    /**
     * Returns all concern constructor - target class pairs in this map
     *
     * @return {IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>}
     */
    [Symbol.iterator](): IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>
    {
        return this.all();
    }

    /**
     * Returns all concern constructor - target class pairs in this map
     *
     * @return {IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>}
     */
    public all(): IterableIterator<[ConcernConstructor, ConstructorOrAbstractConstructor]>
    {
        return this.#map.entries();
    }

    /**
     * Returns all concern classes registered in this map
     *
     * @return {IterableIterator<ConcernConstructor>}
     */
    public concerns(): IterableIterator<ConcernConstructor>
    {
        return this.#map.keys();
    }

    /**
     * Returns all target classes registered in this map
     *
     * @return {IterableIterator<ConstructorOrAbstractConstructor>}
     */
    public classes(): IterableIterator<ConstructorOrAbstractConstructor>
    {
        return this.#map.values();
    }

    /**
     * Merge this map with another concerns classes map
     *
     * @param {ConcernsMap} map
     *
     * @return {ConcernsMap} New Concern Classes Map instance
     *
     * @throws {InjectionException} If entries from given map already exist in this map.
     */
    public merge(map: ConcernsMap): ConcernsMap
    {
        const entries = [
            ...Array.from(this.all()),
            ...Array.from(map.all())
        ];
        
        return new (this.constructor as ConcernsMapConstructor)(entries);
    }

    // TODO:
    #addEntries(entries: [ConcernConstructor, ConstructorOrAbstractConstructor][]): this
    {
        for (const entry of entries) {
            this.#addEntry(entry[0], entry[1]);
        }

        return this;
    }

    // TODO: 
    #addEntry(concern: ConcernConstructor, target: ConstructorOrAbstractConstructor): this
    {
        if (this.has(concern)) {
            // TODO: FAIL here...
            // const existingTarget = this.map.get(concern);
            // throw new InjectionError()
        }

        this.#map.set(concern, target);

        return this;
    }
}