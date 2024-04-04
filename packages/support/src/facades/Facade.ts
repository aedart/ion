import type { Container, Identifier } from "@aedart/contracts/container";
import type { Callback } from "@aedart/contracts";
import { isset } from "@aedart/support/misc";
import { AbstractClassError, LogicalError } from "@aedart/support/exceptions";

/**
 * Facade
 * 
 * Adaptation of Laravel's Facade abstraction.
 * 
 * @see https://github.com/laravel/framework/blob/master/src/Illuminate/Support/Facades/Facade.php
 * 
 * @abstract
 */
export default abstract class Facade
{
    /**
     * The facade's service container instance
     *
     * @type {Container|undefined}
     *
     * @protected
     * @static
     */
    protected static container: Container | undefined = undefined;

    /**
     * Resolved instances
     * 
     * @type {Map<Identifier, any>}
     * 
     * @protected
     * @static
     */
    protected static resolved: Map<
        Identifier,
        any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    > = new Map();

    /**
     * Registered object spies
     * 
     * @type {Set<Identifier>}
     * 
     * @protected
     * @static
     */
    protected static spies: Set<Identifier> = new Set();
    
    /**
     * Facade Constructor
     * 
     * @protected
     */
    protected constructor() {
        /* @ts-expect-error TS2345 Facade constructor is abstract */
        throw new AbstractClassError(this.constructor);
    }
    
    /**
     * Returns identifier to be used for resolving facade's underlying object instance
     * 
     * @return {Identifier}
     * 
     * @abstract
     * 
     * @static
     */
    public static getIdentifier(): Identifier
    {
        throw new LogicalError('Facade does not implement the getAccessor() method');
    }

    /**
     * Obtain the underlying object instance, or a "spy" (for testing)
     *
     * @see spy
     * 
     * @return {any}
     *
     * @throws {NotFoundException}
     * @throws {ContainerException}
     * @throws {LogicalError}
     * 
     * @abstract
     *
     * @static
     */
    public static obtain()
    {
        // Use this method to resolve the binding from the service container.
        // E.g. return this.resolveIdentifier<YOUR_COMPONENT_TYPE>();
        
        throw new LogicalError('Facade does not implement the get() method');
    }

    /**
     * Register a "spy" (e.g. object mock) for this facade's identifier
     * 
     * @param {Callback} callback Callback to be used for creating some kind of object spy
     *                   or mock, with appropriate configuration and expectations for testing
     *                   purposes.
     *                   
     * @return {ReturnType<typeof callback>}
     * 
     * @static
     */
    public static spy(callback: Callback): ReturnType<typeof callback>
    {
        const identifier = this.getIdentifier();
        const spy = callback(identifier);

        this.swap(spy);
        
        this.spies.add(identifier);
        
        return spy;
    }

    /**
     * Determine if a spy has been registered for this facade's identifier
     * 
     * @return {boolean}
     * 
     * @static
     */
    public static isSpy(): boolean
    {
        return this.spies.has(this.getIdentifier());
    }

    /**
     * Removes registered spy for this facade's identifier
     * 
     * **Warning**: _Method does NOT perform any actual "spy" cleanup logic.
     * It only removes the reference to the "spy" object._
     * 
     * @return {boolean}
     * 
     * @static
     */
    public static forgetSpy(): boolean
    {
        const identifier = this.getIdentifier();
        
        return this.forgetResolved(identifier)
            && this.spies.delete(identifier);
    }

    /**
     * Removes all registered spies
     * 
     * @return {void}
     * 
     * @static
     */
    public static forgetAllSpies(): void
    {
        for (const identifier of this.spies) {
            this.forgetResolved(identifier);
        }

        this.spies.clear();
    }
    
    /**
     * Swap the facade's underlying instance
     * 
     * @param {any} instance
     * 
     * @return {void}
     * 
     * @static
     */
    public static swap(
        instance: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): void
    {
        const identifier = this.getIdentifier();
        
        this.resolved.set(identifier, instance);
        
        if (this.hasContainer()) {
            (this.getContainer() as Container).instance(identifier, instance);
        }
    }
    
    /**
     * Set this facade's service container instance
     *
     * @param {Container | undefined} container
     *
     * @return {this}
     *
     * @static
     */
    public static setContainer(container: Container | undefined): typeof Facade
    {
        this.container = container;

        return this;
    }

    /**
     * Get this facade's service container instance
     *
     * @return {Container | undefined}
     *
     * @static
     */
    public static getContainer(): Container | undefined
    {
        return this.container;
    }

    /**
     * Determine if facade's has a service container instance set
     *
     * @return {boolean}
     *
     * @static
     */
    public static hasContainer(): boolean
    {
        return isset(this.container);
    }

    /**
     * Removes this facade's service container instance
     *
     * @return {this}
     *
     * @static
     */
    public static forgetContainer(): typeof Facade
    {
        this.container = undefined;

        return this;
    }

    /**
     * Determine if resolved facade instance exists
     * 
     * @param {Identifier} identifier
     * 
     * @reurn {boolean}
     * 
     * @static
     */
    public static hasResolved(identifier: Identifier): boolean
    {
        return this.resolved.has(identifier);
    }
    
    /**
     * Forget resolved facade instance
     * 
     * @param {Identifier} identifier
     * 
     * @return {boolean}
     * 
     * @static
     */
    public static forgetResolved(identifier: Identifier): boolean
    {
        return this.resolved.delete(identifier);
    }

    /**
     * Forget all resolved facade instances
     * 
     * @return {void}
     * 
     * @static
     */
    public static forgetAllResolved(): void
    {
        this.resolved.clear();
    }

    /**
     * Clears all resolved instances, service container and evt. spies.
     * 
     * @return {void}
     */
    public static destroy(): void
    {
        this.forgetAllSpies();
        this.forgetAllResolved();
        this.forgetContainer();
    }

    /**
     * Resolves the facade's underlying object instance from the service container.
     * 
     * @see resolve
     * 
     * @template T = any
     * 
     * @return {T}
     *
     * @throws {NotFoundException}
     * @throws {ContainerException}
     * @throws {LogicalError}
     * 
     * @protected
     * @static
     */
    protected static resolveIdentifier<
        T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(): T
    {
        return this.resolve<T>(this.getIdentifier());
    }
    
    /**
     * Resolves the facade's underlying object instance from the service container,
     * which matches given identifier.
     * 
     * **Note**: _If a "spy" has been registered for given identifier, then that spy
     * object is returned instead._
     *
     * @template T = any
     *
     * @param {Identifier} identifier
     * 
     * @return {T}
     *
     * @throws {NotFoundException}
     * @throws {ContainerException}
     * @throws {LogicalError}
     * 
     * @protected
     * 
     * @static
     */
    protected static resolve<
        T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(identifier: Identifier): T
    {
        if (!this.hasContainer()) {
            throw new LogicalError('Facade has no service container instance set');
        }
        
        if (this.hasResolved(identifier)) {
            return this.resolved.get(identifier) as T;
        }

        const resolved = (this.getContainer() as Container).make<T>(identifier);
        this.resolved.set(identifier, resolved);

        return resolved;
    }
}