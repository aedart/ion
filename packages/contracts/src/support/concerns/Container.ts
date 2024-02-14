import type { Constructor } from "@aedart/contracts";
import type { Concern } from "./Concern";

/**
 * Concerns Container
 */
export default interface Container
{
    /**
     * Determine if a concern class exists in this map
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
    boot<T extends Concern>(concern: Constructor<T>): void
    
    // TODO:
    all(): Constructor<Concern>[];
}