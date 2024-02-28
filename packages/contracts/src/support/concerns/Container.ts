import ConcernConstructor from "./ConcernConstructor";
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
     * @type {Owner}
     */
    get owner(): Owner;
    
    /**
     * Determine if concern class is registered in this container
     *
     * @param {ConcernConstructor} concern
     * 
     * @return {boolean}
     */
    has(concern: ConcernConstructor): boolean;

    /**
     * Retrieve concern instance for given concern class
     * 
     * **Note**: _If concern class is registered in this container, but not yet
     * booted, then this method will boot it via the {@link boot} method, and return
     * the resulting instance._
     * 
     * @template T extends {@link Concern}
     *
     * @param {ConcernConstructor<T>} concern
     *
     * @return {T} The booted instance of the concern class. If concern class was
     *                   previously booted, then that instance is returned.
     *
     * @throws {ConcernException}
     */
    get<T extends Concern>(concern: ConcernConstructor<T>): T;

    /**
     * Determine if concern class has been booted
     * 
     * @param {ConcernConstructor} concern
     * 
     * @return {boolean}
     */
    hasBooted(concern: ConcernConstructor): boolean

    /**
     * Boot concern class
     *
     * @template T extends {@link Concern}
     * 
     * @param {ConcernConstructor<T>} concern
     * 
     * @return {Concern} New concern instance
     * 
     * @throws {NotRegisteredException} If concern class is not registered in this container
     * @throws {BootException} If concern is unable to be booted, e.g. if already booted
     */
    boot<T extends Concern>(concern: ConcernConstructor<T>): T;

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
     * @return {IterableIterator<ConcernConstructor>}
     */
    all(): IterableIterator<ConcernConstructor>;

    /**
     * Invoke a method with given arguments in concern instance
     * 
     * @param {ConcernConstructor} concern
     * @param {PropertyKey} method
     * @param {...any} [args]
     * 
     * @return {any}
     * 
     * @throws {ConcernException}
     * @throws {Error}
     */
    call(
        concern: ConcernConstructor,
        method: PropertyKey,
        ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Set the value of given property in concern instance
     * 
     * @param {ConcernConstructor} concern
     * @param {PropertyKey} property
     * @param {any} value
     *
     * @throws {ConcernException}
     * @throws {Error}
     */
    setProperty(
        concern: ConcernConstructor,
        property: PropertyKey,
        value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): void;

    /**
     * Get value of given property in concern instance
     *
     * @param {ConcernConstructor} concern
     * @param {PropertyKey} property
     * 
     * @return {any}
     *
     * @throws {ConcernException}
     * @throws {Error}
     */
    getProperty(
        concern: ConcernConstructor,
        property: PropertyKey
    ): any; /* eslint-disable-line @typescript-eslint/no-explicit-any */
}