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
     * @return {Concern} The booted instance of the concern class. If concern class was
     *                   previously booted, then that instance is returned.
     *
     * @throws {ConcernException}
     */
    get<T extends Concern>(concern: Constructor<T>): T;

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
     * @return {Concern} New concern instance
     * 
     * @throws {NotRegisteredException} If concern class is not registered in this container
     * @throws {BootException} If concern is unable to be booted, e.g. if already booted
     */
    boot<T extends Concern>(concern: Constructor<T>): T;

    /**
     * Boots all registered concern classes
     *
     * @throws {ConcernException}
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

    /**
     * Invoke a method with given arguments in concern instance
     * 
     * @param {Constructor<Concern>} concern
     * @param {PropertyKey} method
     * @param {...unknown} [arguments]
     * 
     * @return {unknown}
     * 
     * @throws {ConcernException}
     * @throws {Error}
     */
    call(
        concern: Constructor<Concern>,
        method: PropertyKey,
        ...arguments: unknown
    ): unknown;

    /**
     * Set the value of given property in concern instance
     * 
     * @param {Constructor<Concern>} concern
     * @param {PropertyKey} property
     * @param {unknown} value
     *
     * @throws {ConcernException}
     * @throws {Error}
     */
    setProperty(concern: Constructor<Concern>, property: PropertyKey, value: unknown): void;

    /**
     * Get value of given property in concern instance
     *
     * @param {Constructor<Concern>} concern
     * @param {PropertyKey} property
     * 
     * @return {unknown}
     *
     * @throws {ConcernException}
     * @throws {Error}
     */
    getProperty(concern: Constructor<Concern>, property: PropertyKey): unknown;
}