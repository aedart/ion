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
     * Determine if concern class is registered in this container
     *
     * @param {Constructor<Concern>} concern
     * 
     * @return {boolean}
     */
    has(concern: Constructor<Concern>): boolean;

    /**
     * Retrieve concern instance for given concern class
     * 
     * **Note**: _If concern class is registered in this container, but not yet
     * booted, then this method will boot it via the {@link boot} method, and return
     * the resulting instance._
     * 
     * @template T extends {@link Concern}
     *
     * @param {Constructor<T>} concern
     *
     * @return {Concern|null} Concern instance or `null` if provided concern class
     *                        is not registered in this container.
     *
     * @throws {Error}
     */
    get<T extends Concern>(concern: Constructor<T>): T|null;

    /**
     * Determine if concern class has been booted
     * 
     * @param {Constructor<Concern>} concern
     * 
     * @return {boolean}
     */
    hasBooted(concern: Constructor<Concern>): boolean

    /**
     * Boot concern class
     *
     * @template T extends {@link Concern}
     * 
     * @param {Constructor<T>} concern
     * 
     * @return {Concern} New concern instance, or existing instance if concern has
     *                   already been booted.
     * 
     * @throws {Error} If provided concern class is not registered in this container.
     */
    boot<T extends Concern>(concern: Constructor<T>): T;

    /**
     * Boots all registered concern classes
     *
     * @throws {Error}
     */
    bootAll(): void;
    
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

    /**
     * Returns all concern classes
     * 
     * @return {IterableIterator<Constructor<Concern>>}
     */
    all(): IterableIterator<Constructor<Concern>>;
}