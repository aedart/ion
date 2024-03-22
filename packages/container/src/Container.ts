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
import BindingEntry from "./BindingEntry";

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
     * Registered bindings
     * 
     * @type {Map<Identifier, Binding>}
     * 
     * @protected
     */
    protected bindings: Map<Identifier, Binding> = new Map();

    /**
     * Registered aliases
     * 
     * @type {Map<Alias, Identifier>}
     * 
     * @protected
     */
    protected aliases: Map<Alias, Identifier> = new Map();

    /**
     * Registered "shared" instances (singletons)
     * 
     * @type {Map<Identifier, object>}
     * 
     * @protected
     */
    protected instances: Map<Identifier, object> = new Map();
    
    /**
     * Returns the singleton instance of the service container
     * 
     * @return {ServiceContainerContract|this}
     */
    public static getInstance(): ServiceContainerContract
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
    public static setInstance(container: ServiceContainerContract | null = null): ServiceContainerContract | null
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
    public bind(identifier: Identifier, concrete?: FactoryCallback | Constructor, shared: boolean = false): this
    {
        concrete = concrete ?? identifier as Constructor;
        
        this.bindings.set(identifier, this.makeBindingEntry(identifier, concrete, shared));

        // TODO: isResolved() vs. rebound() ???
        
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
    public bindIf(identifier: Identifier, concrete?: FactoryCallback | Constructor, shared: boolean = false): this
    {
        if (!this.bound(identifier)) {
            this.bind(identifier, concrete, shared);
        }
        
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
    public singleton(identifier: Identifier, concrete?: FactoryCallback | Constructor): this
    {
        return this.bind(identifier, concrete, true);
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
    public singletonIf(identifier: Identifier, concrete?: FactoryCallback | Constructor): this
    {
        if (!this.bound(identifier)) {
            this.singleton(identifier, concrete);
        }

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
    public instance<T = object>(identifier: Identifier, instance: T): T
    {
        this.instances.set(identifier, instance as object);
        
        // TODO: rebound() ???
        
        return instance;
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
    public get<
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
    public has(identifier: Identifier): boolean
    {
        return this.bindings.has(identifier)
            || this.instances.has(identifier)
            || this.isAlias(identifier);
    }

    /**
     * Alias for {@link has}
     *
     * @param {Identifier} identifier
     *
     * @returns {boolean}
     */
    public bound(identifier: Identifier): boolean
    {
        return this.has(identifier);
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
    public alias(identifier: Identifier, alias: Alias): this
    {
        if (alias === identifier) {
            throw new TypeError(`${identifier.toString()} is aliased to itself`, { cause: { identifier: identifier, alias: alias } });
        }
        
        this.aliases.set(alias, identifier);
        
        return this;
    }

    /**
     * Determine if identifier is an alias
     * 
     * @param {Identifier} identifier
     * 
     * @return {boolean}
     */
    public isAlias(identifier: Identifier): boolean
    {
        return this.aliases.has(identifier);
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
    public make<
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
    public makeOrDefault<
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
    public build<T = object>(concrete: Constructor<T> | Binding<T>): T
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
    public call(method: Callback | CallbackWrapper | ClassMethodReference, args: any[]): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
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
    public extend(identifier: Identifier, callback: ExtendCallback): this
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
    public forget(identifier: Identifier): boolean
    {
        // TODO: Implement this...
        return false;
    }

    /**
     * Flush container of all bindings and resolved instances
     *
     * @returns {void}
     */
    public flush(): void
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
    public isResolved(identifier: Identifier): boolean
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
    public before(identifier: Identifier, callback: BeforeResolvedCallback): this
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
    public after(identifier: Identifier, callback: AfterResolvedCallback): this
    {
        // TODO: Implement this...
        return this;
    }

    /**
     * Returns a new Binding Entry for given identifier and binding value
     * 
     * @param {Identifier} identifier
     * @param {FactoryCallback | Constructor} value
     * @param {boolean} [shared]
     * 
     * @return {Binding}
     *
     * @throws {TypeError}
     * 
     * @protected
     */
    protected makeBindingEntry(identifier: Identifier, value: FactoryCallback | Constructor, shared: boolean = false): Binding
    {
        return new BindingEntry(identifier, value, shared);
    }
}