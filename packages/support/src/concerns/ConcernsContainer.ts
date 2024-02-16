import type {
    Container,
    Concern,
    Owner
} from "@aedart/contracts/support/concerns";
import type { Constructor } from "@aedart/contracts";
import { getNameOrDesc } from "@aedart/support/reflections";
import BootError from "./exceptions/BootError";
import NotRegisteredError from "./exceptions/NotRegisteredError";

/**
 * Concerns Container
 * 
 * @see Container
 */
export default class ConcernsContainer implements Container
{
    /**
     * Map that holds concern class constructors
     * and actual concern instances
     * 
     * @private
     * @readonly
     * 
     * @type {Map<Constructor<Concern>, Concern|undefined>}
     */
    readonly #map: Map<Constructor<Concern>, Concern|undefined>;

    /**
     * The concerns owner of this container
     * 
     * @private
     * @readonly
     * 
     * @type {Owner}
     */
    readonly #owner: Owner;

    /**
     * Create a new Concerns Container instance
     * 
     * @param {Owner} owner
     * @param {Constructor<Concern>[]} concerns
     */
    public constructor(owner: Owner, concerns: Constructor<Concern>[]) {
        this.#owner = owner;
        this.#map = new Map<Constructor<Concern>, Concern | undefined>();
        
        for(const concern: Constructor<Concern> of concerns) {
            this.#map.set(concern, undefined);
        }
    }
    
    /**
     * The amount of concerns in this container
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
     * Get the concerns container owner
     *
     * @readonly
     * 
     * @return {Owner}
     */
    public get owner(): Owner
    {
        return this.#owner;
    }

    /**
     * Determine if concern class is registered in this container
     *
     * @param {Constructor<Concern>} concern
     *
     * @return {boolean}
     */
    public has(concern: Constructor<Concern>): boolean
    {
        return this.#map.has(concern);
    }

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
     * @throws {ConcernError}
     */
    public get<T extends Concern>(concern: Constructor<T>): T
    {
        if (!this.hasBooted(concern)) {
            return this.boot(concern);
        }
        
        return this.#map.get(concern) as T;
    }

    /**
     * Determine if concern class has been booted
     *
     * @param {Constructor<Concern>} concern
     *
     * @return {boolean}
     */
    public hasBooted(concern: Constructor<Concern>): boolean
    {
        return this.has(concern) && this.#map.get(concern) !== undefined;
    }

    /**
     * Boot concern class
     *
     * @template T extends {@link Concern}
     *
     * @param {Constructor<T>} concern
     *
     * @return {Concern} New concern instance
     *
     * @throws {NotRegisteredError} If concern class is not registered in this container
     * @throws {BootError} If concern is unable to be booted, e.g. if already booted
     */
    public boot<T extends Concern>(concern: Constructor<T>): T
    {
        // Fail if given concern is not in this container
        if (!this.has(concern)) {
            throw new NotRegisteredError(concern, { cause: { owner: this.owner } });
        }
        
        // Fail if concern instance already exists (has booted)
        let instance: T | undefined = this.#map.get(concern);
        if (instance !== undefined) {
            throw new BootError(concern, `Concern ${getNameOrDesc(concern)} is already booted`, { cause: { owner: this.owner } });
        }
        
        // Boot the concern (create new instance) and register it...
        try {
            instance = new concern(this.owner);
            this.#map.set(concern, instance);            
        } catch (error) {
            const reason: string  = error?.message || 'unknown reason!';
            throw new BootError(concern, `Unable to boot concern ${getNameOrDesc(concern)}: ${reason}`, { cause: { previous: error, owner: this.owner } });
        }

        return instance;
    }

    /**
     * Boots all registered concern classes
     *
     * @throws {ConcernError}
     */
    public bootAll(): void
    {
        const concerns: IterableIterator<Constructor<Concern>> = this.all();
        for (const concern: Constructor<Concern> of concerns) {
            this.boot(concern);
        }
    }

    /**
     * Determine if this container is empty
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
     * Returns all concern classes
     *
     * @return {IterableIterator<Constructor<Concern>>}
     */
    public all(): IterableIterator<Constructor<Concern>>
    {
        return this.#map.keys();
    }
}