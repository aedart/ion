import type {
    AfterResolvedCallback,
    Alias, BeforeResolvedCallback,
    Container as ServiceContainerContract,
    ExtendCallback,
    FactoryCallback,
    Identifier,
    Binding
} from "@aedart/contracts/container";
import type { Callback, ClassMethodReference, Constructor } from "@aedart/contracts";
import type { CallbackWrapper } from "@aedart/contracts/support";

/**
 * Service Container
 * 
 * Adaptation of Laravel's Service Container.
 * 
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Container/Container.php
 */
export default class Container implements ServiceContainerContract
{
    /**
     * Singleton instance of the service container
     *
     * @type {ServiceContainerContract|null}
     * 
     * @private
     * 
     * @static
     */
    static #instance: ServiceContainerContract | null = null;

    /**
     * Returns the singleton instance of the service container
     * 
     * @return {ServiceContainerContract|this}
     */
    static getInstance(): ServiceContainerContract
    {
        if (this.#instance === null) {
            this.setInstance(new this());
        }
        
        return this.#instance as ServiceContainerContract;
    }

    /**
     * Set the singleton instance of the service container
     * 
     * @param {ServiceContainerContract | null} [container]
     * 
     * @return {ServiceContainerContract | null}
     */
    static setInstance(container: ServiceContainerContract | null = null): ServiceContainerContract | null
    {
        return this.#instance = container;
    }
    
    /**
     * Register a binding
     *
     * @param {Identifier} identifier
     * @param {FactoryCallback | Constructor} [concrete]
     * @param {boolean} [shared=false]
     *
     * @returns {this}
     *
     * @throws {TypeError}
     */
    bind(identifier: Identifier, concrete?: FactoryCallback | Constructor, shared?: boolean): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Register a binding, if none already exists for given identifier
     *
     * @param {Identifier} identifier
     * @param {FactoryCallback | Constructor} [concrete]
     * @param {boolean} [shared=false]
     *
     * @returns {this}
     *
     * @throws {TypeError}
     */
    bindIf(identifier: Identifier, concrete?: FactoryCallback | Constructor, shared?: boolean): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Register a shared binding
     *
     * @param {Identifier} identifier
     * @param {FactoryCallback | Constructor} [concrete]
     *
     * @returns {this}
     *
     * @throws {TypeError}
     */
    singleton(identifier: Identifier, concrete?: FactoryCallback | Constructor): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Register a shared binding, if none already exists for given identifier
     *
     * @param {Identifier} identifier
     * @param {FactoryCallback | Constructor} [concrete]
     *
     * @returns {this}
     *
     * @throws {TypeError}
     */
    singletonIf(identifier: Identifier, concrete?: FactoryCallback | Constructor): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Register existing object instance as a shared binding
     *
     * @template T = object
     *
     * @param {Identifier} identifier
     * @param {T} instance
     *
     * @returns {T}
     *
     * @throws {TypeError}
     */
    instance<T = object>(identifier: Identifier, instance: T): T
    {
        // TODO: Implement this...
        return null as T;
    }

    /**
     * Resolves binding value that matches identifier and returns it
     *
     * @template T = any
     *
     * @param {Identifier} identifier
     *
     * @returns {T}
     *
     * @throws {NotFoundException}
     * @throws {ContainerException}
     */
    get<
        T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(identifier: Identifier): T
    {
        // TODO: Implement this...
        return null as T;
    }

    /**
     * Determine if an entry is registered for given identifier.
     *
     * @param {Identifier} identifier
     *
     * @returns {boolean}
     */
    has(identifier: Identifier): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Alias for {@link has}
     *
     * @param {Identifier} identifier
     *
     * @returns {boolean}
     */
    bound(identifier: Identifier): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Alias identifier as a different identifier
     *
     * @param {Identifier} identifier
     * @param {Alias} alias
     *
     * @returns {this}
     *
     * @throws {TypeError}
     */
    alias(identifier: Identifier, alias: Alias): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Resolves binding value that matches identifier and returns it
     *
     * @template T = any
     *
     * @param {Identifier} identifier
     * @param {any[]} [args] Eventual arguments to pass on to {@link FactoryCallback} or {@link Constructor}
     *
     * @returns {T}
     *
     * @throws {NotFoundException}
     * @throws {ContainerException}
     */
    make<
        T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(identifier: Identifier, args?: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */): T
    {
        // TODO: Implement this...
        return null as T;
    }

    /**
     * Resolves values if a binding exists for identifier, or returns a default value
     *
     * @template T = any
     * @template D = undefined
     *
     * @param {Identifier} identifier
     * @param {any[]} [args] Eventual arguments to pass on to {@link FactoryCallback} or {@link Constructor}
     * @param {D} [defaultValue]
     *
     * @returns {T}
     *
     * @throws {ContainerException}
     */
    makeOrDefault<
        T = any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        D = undefined
    >(identifier: Identifier, args?: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */, defaultValue?: D): T | D
    {
        // TODO: Implement this...
        return null as D;
    }

    /**
     * Instantiate a new instance of given concrete
     *
     * @template T = object
     *
     * @param {Constructor<T> | Binding<T>} concrete
     *
     * @returns {T}
     *
     * @throws {ContainerException}
     */
    build<T = object>(concrete: Constructor<T> | Binding<T>): T
    {
        // TODO: Implement this...
        return null as T;
    }

    /**
     * Call given method and inject dependencies if needed
     *
     * @param {Callback | CallbackWrapper | ClassMethodReference} method
     * @param {any[]} args
     *
     * @return {any}
     *
     * @throws {ContainerException}
     */
    call(method: Callback | CallbackWrapper | ClassMethodReference, args: any[]): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        // TODO: Implement this...
        return null;
    }

    /**
     * Extend the registered binding
     *
     * @param {Identifier} identifier
     * @param {ExtendCallback} callback
     *
     * @return {this}
     *
     * @throws {TypeError}
     * @throws {ContainerException}
     */
    extend(identifier: Identifier, callback: ExtendCallback): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Forget binding and resolved instance for given identifier
     *
     * @param {Identifier} identifier
     *
     * @returns {boolean}
     */
    forget(identifier: Identifier): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Flush container of all bindings and resolved instances
     *
     * @returns {void}
     */
    flush(): void
    {
        // TODO: Implement this...
        return;
    }

    /**
     * Determine if identifier has been resolved
     *
     * @param {Identifier} identifier
     *
     * @return {boolean}
     */
    isResolved(identifier: Identifier): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Register a callback to be invoked before a binding is resolved
     *
     * @param {Identifier} identifier
     * @param {BeforeResolvedCallback} callback
     *
     * @return {this}
     */
    before(identifier: Identifier, callback: BeforeResolvedCallback): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Register a callback to be invoked after a binding has been resolved
     *
     * @param {Identifier} identifier
     * @param {AfterResolvedCallback} callback
     *
     * @return {this}
     */
    after(identifier: Identifier, callback: AfterResolvedCallback): this
    {
        // TODO: Implement this...
        return this;
    }
}