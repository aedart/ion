import type { Constructor } from "@aedart/contracts";
import Concern from "./Concern";
import Owner from "./Owner";

/**
 * Concerns Container
 */
export default interface Container
{
    /**
     * The amount of concerns in this container
     * 
     * @readonly
     * 
     * @type {number}
     */
    readonly size: number;

    /**
     * Get the concerns container owner
     * 
     * @return {Owner}
     */
    get owner(): Owner;
    
    /**
     * Determine if a concern class exists in this container
     * 
     * @template T extends {@link Concern}
     * 
     * @param {Constructor<T>} concern
     * 
     * @return {boolean}
     */
    has<T extends Concern>(concern: Constructor<T>): boolean;
    
    // TODO:
    get<T extends Concern>(concern: Constructor<T>): Concern|null;
    
    // TODO:
    hasBooted<T extends Concern>(concern: Constructor<T>): boolean
    
    // TODO:
    boot<T extends Concern>(concern: Constructor<T>): T
    
    // TODO:
    all(): Constructor<Concern>[];

    /**
     * Determine if this container is empty
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
}