import {
    AfterResolvedCallback,
    Alias,
    BeforeResolvedCallback,
    Container as ServiceContainerContract,
    ContextualBindingBuilder,
    ExtendCallback,
    FactoryCallback,
    Identifier,
    Binding,
    ReboundCallback,
} from "@aedart/contracts/container";
import type {
    Callback,
    ClassMethodName,
    ClassMethodReference,
    Constructor,
    ConstructorLike
} from "@aedart/contracts";
import type { CallbackWrapper } from "@aedart/contracts/support";
import { DEPENDENCIES } from "@aedart/contracts/container";
import { hasDependencies, getDependencies } from "@aedart/support/container";
import { getErrorMessage } from "@aedart/support/exceptions";
import {
    isConstructor,
    isClassMethodReference,
    getNameOrDesc,
    hasAllMethods,
} from "@aedart/support/reflections";
import {
    isCallbackWrapper,
    CallbackWrapper as Wrapper
} from "@aedart/support";
import CircularDependencyError from "./exceptions/CircularDependencyError";
import ContainerError from "./exceptions/ContainerError";
import NotFoundError from "./exceptions/NotFoundError";
import Builder from "./Builder";
import BindingEntry from "./BindingEntry";
import { isBinding } from "./isBinding";

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
     * @protected
     * 
     * @static
     */
    protected static _instance: ServiceContainerContract | null = null;

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
     * Extend callbacks
     * 
     * @type {Map<Identifier, ExtendCallback[]>}
     * 
     * @protected
     */
    protected extenders: Map<Identifier, ExtendCallback[]> = new Map();

    /**
     * Resolved (built) identifiers
     *
     * @type {Set<Identifier>}
     *
     * @protected
     */
    protected resolved: Set<Identifier> = new Set();

    /**
     * Contextual Bindings
     * 
     * @type {Map<Constructor, Map<Identifier, Binding>>}
     * 
     * @protected
     */
    protected contextualBindings: Map<
        Constructor,
        Map<Identifier, Binding>
    > = new Map();
    
    /**
     * "Before" resolved callbacks
     * 
     * @type {Map<Identifier, BeforeResolvedCallback[]>}
     * 
     * @protected
     */
    protected beforeResolvedCallbacks: Map<Identifier, BeforeResolvedCallback[]> = new Map();

    /**
     * "After" resolved callbacks
     * 
     * @type {Map<Identifier, AfterResolvedCallback[]>}
     * 
     * @protected
     */
    protected afterResolvedCallbacks: Map<Identifier, AfterResolvedCallback[]> = new Map();

    /**
     * Rebound callbacks
     * 
     * @type {Map<Identifier, ReboundCallback[]>}
     * 
     * @protected
     */
    protected reboundCallbacks: Map<Identifier, ReboundCallback[]> = new Map();
    
    /**
     * Resolve stack
     * 
     * @type {Set<Constructor>}
     * 
     * @protected
     */
    protected resolveStack: Set<Constructor> = new Set();
    
    /**
     * Returns the singleton instance of the service container
     * 
     * @return {ServiceContainerContract|this}
     */
    public static getInstance(): ServiceContainerContract
    {
        if (this._instance === null) {
            this.setInstance(new this());
        }
        
        return this._instance as ServiceContainerContract;
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
        return this._instance = container;
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

        // Invoke rebound callbacks, if the identifier has already been resolved, such that
        // dependent objects can be updated...
        if (this.isResolved(identifier)) {
            this.rebound(identifier);
        }
        
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
        const isBound: boolean = this.has(identifier);
        
        this.instances.set(identifier, instance as object);
        
        // If the identifier was already bound before, invoke the rebound callbacks.
        if (isBound) {
            this.rebound(identifier);
        }
        
        return instance;
    }

    /**
     * Add a contextual binding in this container
     *
     * @param {Constructor} concrete
     * @param {Identifier} identifier
     * @param {FactoryCallback | Constructor} implementation
     *
     * @return {this}
     *
     * @throws {TypeError}
     */
    
    public addContextualBinding(
        concrete: Constructor,
        identifier: Identifier,
        implementation: FactoryCallback | Constructor
    ): this
    {
        if (!this.contextualBindings.has(concrete)) {
            this.contextualBindings.set(concrete, new Map<Identifier, Binding>());
        }
        
        const entry = this.contextualBindings.get(concrete) as Map<Identifier, Binding>;
        entry.set(this.getAlias(identifier), this.makeBindingEntry(identifier, implementation));
        
        return this;
    }
    
    /**
     * Define a contextual binding
     *
     * @param {...Constructor[]} concrete
     *
     * @return {ContextualBindingBuilder}
     *
     * @throws {TypeError}
     */
    public when(...concrete: Constructor[]): ContextualBindingBuilder
    {
        return new Builder(this, ...concrete);
    }

    /**
     * Determine if target has one or more contextual bindings registered
     * 
     * @param {Constructor} target
     * 
     * @return {boolean}
     */
    public hasContextualBindings(target: Constructor): boolean
    {
        return this.contextualBindings.has(target) &&
            (this.contextualBindings.get(target) as Map<Identifier, Binding>).size > 0;
    }
    
    /**
     * Determine if a contextual binding is registered for the identifier in given target
     *
     * @param {Constructor} target
     * @param {Identifier} identifier
     *
     * @return {boolean}
     */
    public hasContextualBinding(target: Constructor, identifier: Identifier): boolean
    {
        return this.hasContextualBindings(target)
            && (this.contextualBindings.get(target) as Map<Identifier, Binding>).has(identifier);
    }

    /**
     * Returns contextual binding implementation for given target and identifier
     * 
     * @param {Constructor} target
     * @param {Identifier} identifier
     * 
     * @return {Binding | undefined}
     */
    public getContextualBinding(target: Constructor, identifier: Identifier): Binding | undefined
    {
        return this.contextualBindings.get(target)?.get(identifier);
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
        return this.make<T>(identifier);
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
     * Determine if identifier is registered as a "shared" binding
     *
     * @param {Identifier} identifier
     *
     * @returns {boolean}
     */
    public isShared(identifier: Identifier): boolean
    {
        return this.instances.has(identifier)
            || (this.bindings.has(identifier) && (this.bindings.get(identifier) as Binding).shared)
    }

    /**
     * Returns the identifier for given alias, if available
     * 
     * @param {Identifier} alias
     * 
     * @returns {Identifier}
     */
    public getAlias(alias: Identifier): Identifier
    {
        return this.aliases.has(alias)
            ? this.getAlias(this.aliases.get(alias) as Identifier)
            : alias;
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
    >(identifier: Identifier, args: any[] = [] /* eslint-disable-line @typescript-eslint/no-explicit-any */): T
    {
        return this.resolve<T>(identifier, args);
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
        if (!this.has(identifier) && !this.isBuildable(identifier)) {
            if (typeof defaultValue === 'function') {
                return defaultValue(this, args);
            }

            return defaultValue as D;
        }
        
        return this.make<T>(identifier, args);
    }

    /**
     * Instantiate a new instance of given concrete
     *
     * @template T = object
     *
     * @param {Constructor<T> | Binding<T>} concrete
     * @param {any[]} [args] Eventual arguments to pass on the concrete instance's constructor.
     *
     * @returns {T}
     *
     * @throws {ContainerException}
     */
    public build<T = object>(
        concrete: Constructor<T> | Binding<T>,
        args: any[] = [] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): T
    {
        const isBinding: boolean = this.isBinding(concrete);
        let identifier: Identifier = concrete; 
        
        // Resolve factory callback, when binding is given of such type.
        if (isBinding && (concrete as Binding).isFactoryCallback()) {
            return this.resolveFactoryCallback((concrete as Binding).value as FactoryCallback, args, (concrete as Binding).identifier);
        }
        
        // Extract constructor, if concrete is a binding so that it can be resolved.
        if (isBinding) {
            identifier = (concrete as Binding).identifier;
            concrete = (concrete as Binding).value as Constructor<T>;
        }
        
        // Abort if concrete is not buildable
        if (!this.isBuildable(concrete)) {
            const nameOrDesc: string = getNameOrDesc(concrete as ConstructorLike);
            throw new ContainerError(`Unable to build concrete: ${nameOrDesc} is not a constructor or a Binding Entry`, { cause: { concrete: concrete, args: args } });
        }

        // Resolve the constructor and eventual dependencies, when no arguments are given.
        return this.resolveConstructor(
            concrete as Constructor<T>,
            args,
            identifier
        );
    }

    /**
     * Call given method and inject dependencies if needed
     *
     * @param {Callback | CallbackWrapper | ClassMethodReference} method
     * @param {any[]} [args]
     *
     * @return {any}
     *
     * @throws {ContainerException}
     */
    public call(method: Callback | CallbackWrapper | ClassMethodReference, args: any[] = []): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        if (isClassMethodReference(method)) {
            return this.invokeClassMethod(method as ClassMethodReference, args); 
        }
        
        if (isCallbackWrapper(method)) {
            return this.invokeCallbackWrapper(method as CallbackWrapper, args);
        }
        
        const type: string = typeof method;
        if (type == 'function') {
            return this.invokeCallback(method as Callback, args);
        }
        
        throw new ContainerError(`Unable to call method: ${type} is not supported`, { cause: { method: method, args: args } });
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
        identifier = this.getAlias(identifier);
        
        // If identifier matches a "shared" instance, then extend that instance right
        // away and rebound it.
        if (this.instances.has(identifier)) {
            const instance = this.instances.get(identifier) as object;
            
            this.instances.set(identifier, callback(instance, this));
            
            this.rebound(identifier);
        } else {
            // Otherwise, add extend callback to the existing for the identifier.
            if (!this.extenders.has(identifier)) {
                this.extenders.set(identifier, []);
            }
            
            const existing: ExtendCallback[] = this.extenders.get(identifier) as ExtendCallback[];
            existing.push(callback);
            this.extenders.set(identifier, existing);
            
            if (this.isResolved(identifier)) {
                this.rebound(identifier);
            }
        }
        
        return this;
    }

    /**
     * Register a callback to be invoked whenever identifier is "rebound"
     *
     * @param {Identifier} identifier
     * @param {ReboundCallback} callback
     *
     * @return {any | void}
     *
     * @throws {ContainerException}
     */
    public rebinding(identifier: Identifier, callback: ReboundCallback): any | void  /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        identifier = this.getAlias(identifier);
        
        if (!this.reboundCallbacks.has(identifier)) {
            this.reboundCallbacks.set(identifier, []);
        }

        const existing: ReboundCallback[] = this.reboundCallbacks.get(identifier) as ReboundCallback[];
        existing.push(callback);
        this.reboundCallbacks.set(identifier, existing);
        
        if (this.has(identifier)) {
            return this.make(identifier);
        }
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
        const removedAlias: boolean = this.aliases.delete(identifier);
        const removedInstance: boolean = this.forgetInstance(identifier);
        const removedBinding: boolean = this.bindings.delete(this.getAlias(identifier));
        
        return removedBinding || removedInstance || removedAlias;
    }

    /**
     * Forget resolved instance for given identifier
     *
     * @param {Identifier} identifier
     *
     * @return {boolean}
     */
    public forgetInstance(identifier: Identifier): boolean
    {
        return this.instances.delete(this.getAlias(identifier));
    }

    /**
     * Flush container of all bindings and resolved instances
     *
     * @returns {void}
     */
    public flush(): void
    {
        this.bindings.clear();
        this.instances.clear();
        this.aliases.clear();
        this.resolved.clear();
        this.contextualBindings.clear();
        this.resolveStack.clear();
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
        identifier = this.getAlias(identifier);
        
        return this.resolved.has(identifier)
            || this.instances.has(identifier);
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
        identifier = this.getAlias(identifier);
        
        if (!this.beforeResolvedCallbacks.has(identifier)) {
            this.beforeResolvedCallbacks.set(identifier, []);
        }
        
        const existing: BeforeResolvedCallback[] = this.beforeResolvedCallbacks.get(identifier) as BeforeResolvedCallback[];
        existing.push(callback);
        this.beforeResolvedCallbacks.set(identifier, existing);
        
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
        identifier = this.getAlias(identifier);

        if (!this.afterResolvedCallbacks.has(identifier)) {
            this.afterResolvedCallbacks.set(identifier, []);
        }

        const existing: AfterResolvedCallback[] = this.afterResolvedCallbacks.get(identifier) as AfterResolvedCallback[];
        existing.push(callback);
        this.afterResolvedCallbacks.set(identifier, existing);

        return this;
    }

    /**
     * Resolves binding value that matches identifier
     *
     * @template T = any
     *
     * @param {Identifier} identifier
     * @param {any[]} args Eventual arguments to pass on to {@link FactoryCallback} or {@link Constructor}
     * @param {boolean} [fireEvents=true] If `true`, then "before" and "after" resolved callbacks will be invoked.
     *
     * @returns {T}
     *
     * @throws {NotFoundException}
     * @throws {ContainerException}
     *
     * @protected
     */
    protected resolve<
        T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    >(
        identifier: Identifier,
        args: any[] = [], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        fireEvents: boolean = true
    ): T
    {
        identifier = this.getAlias(identifier);
        
        // Fire "before" resolve callbacks
        if (fireEvents) {
            this.fireBeforeResolvedCallbacks(identifier, args);
        }

        // Returns "shared" instance, if requested identifier matches one.
        if (this.instances.has(identifier)) {
            return this.instances.get(identifier) as T;
        }
        
        // Find registered binding for identifier. Or, fail if no binding exists and given
        // identifier is not buildable.
        const binding: Binding | undefined = this.bindings.get(identifier);
        
        if (binding === undefined && this.isBuildable(identifier)) {
            return this.build<T>(identifier as Constructor<T>, args);
        } else if (binding === undefined) {
            throw new NotFoundError(`No binding found for ${identifier.toString()}`, { cause: { identifier: identifier, args: args } });
        }
        
        // Build instance or value that was registered for the given identifier.
        let resolved: T = this.build<T>(binding, args);
        
        // Invoke all extend callbacks for identifier, if any have been registered.
        const extendCallbacks: ExtendCallback[] = this.getExtenders(identifier);
        for (const extendCallback of extendCallbacks) {
            resolved = extendCallback(resolved, this) as T;
        }
        
        // If requested binding is registered as "shared", save the resolved as an instance.
        if (this.isShared(identifier)) {
            this.instances.set(identifier, resolved as object);
        }

        // Fire "after" resolved callbacks
        if (fireEvents) {
            this.fireAfterResolvedCallbacks(identifier, resolved);
        }
        
        // Mark identifier as resolved
        this.resolved.add(identifier);
        
        // Finally, return the resolved instance or value
        return resolved;
    }

    /**
     * Resolves given factory callback
     *
     * @template T = object
     *
     * @param {FactoryCallback<T>} callback
     * @param {any[]} [args]
     * @param {Identifier} [identifier]
     *
     * @returns {T}
     *
     * @throws {ContainerException}
     * 
     * @protected
     */
    protected resolveFactoryCallback<T = object>(
        callback: FactoryCallback<T>,
        args: any[] = [], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        identifier?: Identifier
    ): T
    {
        try {
            return callback(this, ...args) as T;
        } catch (e) {
            identifier = identifier ?? callback;
            
            const reason: string = getErrorMessage(e);
            const options = {
                cause: {
                    callback: callback,
                    args: args,
                    identifier: identifier,
                    previous: e
                }
            }

            throw new ContainerError(`Unable to resolve factory callback for binding "${identifier.toString()}": ${reason}`, options);
        }
    }

    /**
     * Resolves given constructor and eventual dependencies
     * 
     * @template T = object
     * 
     * @param {Constructor<T>} target
     * @param {any[]} [args] Defaults to target class' dependencies (if available), when no arguments are
     *                       given.
     * @param {Identifier} [identifier]
     * 
     * @returns {T}
     *
     * @throws {ContainerException}
     * 
     * @protected
     */
    protected resolveConstructor<T = object>(
        target: Constructor<T>,
        args: any[] = [], /* eslint-disable-line @typescript-eslint/no-explicit-any */
        identifier?: Identifier
    ): T
    {
        try {
            this.preventCircularDependency(target as Constructor);

            this.resolveStack.add(target as Constructor);
            
            // When no arguments are given (overwrites), attempt to obtain defined
            // dependencies for the target class and resolve them from the container.
            if (args.length == 0 && this.hasDependencies(target)) {
                args = this.resolveDependencies(target);
            }

            // Create the instance with arguments.
            const resolved: T = new target(...args) as T;

            this.resolveStack.delete(target as Constructor);

            return resolved;
        } catch (e) {
            identifier = identifier ?? target;
            
            if (e instanceof CircularDependencyError) {
                if (e.cause === undefined) {
                    e.cause = Object.create(null);
                }

                (e.cause as any).target = target; /* eslint-disable-line @typescript-eslint/no-explicit-any */
                (e.cause as any).args = args; /* eslint-disable-line @typescript-eslint/no-explicit-any */
                (e.cause as any).identifier = identifier; /* eslint-disable-line @typescript-eslint/no-explicit-any */
                (e.cause as any).resolveStack = Array.from(this.resolveStack); /* eslint-disable-line @typescript-eslint/no-explicit-any */

                this.resolveStack.delete(target as Constructor);

                throw e;
            }
            
            const reason: string = getErrorMessage(e);
            const options = {
                cause: {
                    target: target,
                    args: args,
                    identifier: identifier,
                    resolveStack: Array.from(this.resolveStack),
                    previous: e
                }
            }

            this.resolveStack.delete(target as Constructor);
            
            throw new ContainerError(`Unable to resolve "${getNameOrDesc(target as ConstructorLike)}" for binding "${identifier.toString()}": ${reason}`, options);
        }
    }

    /**
     * Invokes method in class and returns the methods output
     * 
     * @param {ClassMethodReference} reference
     * @param {any[]} [args]
     * 
     * @returns {any}
     *
     * @throws {ContainerError}
     * 
     * @protected
     */
    protected invokeClassMethod(reference: ClassMethodReference, args: any[] = []): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        // Build object, when target is a constructor
        let target = reference[0];
        if (typeof target != 'object') {
            target = this.make(target);
        }
        
        const name: ClassMethodName<typeof target> = reference[1];
        const method: Callback = target[name];

        // Resolve evt. dependencies if no arguments are given...
        if (args.length == 0 && this.hasDependencies(method as object)) {
            args = this.resolveDependencies(method as object);
        }
        
        // Wrap the class method into a callback-wrapper, such that the "ThisArg" can be
        // applied correctly.
        return this.invokeCallbackWrapper(
            Wrapper.makeFor(target, method, args)
        );
    }

    /**
     * Invokes the wrapped callback and returns its output
     * 
     * @param {CallbackWrapper} wrapper
     * @param {any[]} [args]
     * 
     * @returns {any}
     *
     * @throws {ContainerError}
     * 
     * @protected
     */
    protected invokeCallbackWrapper(wrapper: CallbackWrapper, args: any[] = []): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        // A callback wrapper might already have arguments defined. However,
        // if there are any arguments provided here, then the wrapper's arguments must
        // be overwritten.
        if (args.length != 0) {
            wrapper.arguments = args;
        }
        
        // But, if no arguments are given, and if the wrapper does not have any arguments,
        // then we check if "dependencies" has been defined. If so, they which must be resolved
        // and set as arguments for the wrapper's callback.
        if (args.length == 0
            && !wrapper.hasArguments()
            && hasAllMethods(wrapper,  'has', 'get')
            /* @ts-expect-error TS7053 - has method is in wrapper at this point */
            && wrapper['has'](DEPENDENCIES)
        ) {
            /* @ts-expect-error TS7053 - get method is in wrapper at this point */ 
            const dependencies: Identifier[] = wrapper['get'](DEPENDENCIES) ?? [];
            const resolved: any[] = []; /* eslint-disable-line @typescript-eslint/no-explicit-any */
            for(const identifier of dependencies) {
                resolved.push(this.resolveDependency(identifier, wrapper));
            }

            wrapper.arguments = resolved;
        }
        
        // Finally, call the wrapper's callback.
        return wrapper.call();
    }

    /**
     * Invokes the given callback and returns its output
     * 
     * @param {Callback} callback
     * @param {any[]} [args]
     * 
     * @returns {any}
     * 
     * @throws {ContainerError}
     * 
     * @protected
     */
    protected invokeCallback(callback: Callback, args: any[] = []): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        // When no arguments are provided, attempt to obtain and resolve dependencies
        // for the callback (if any dependencies are defined for the callback).
        if (args.length == 0 && this.hasDependencies(callback as object)) {
            args = this.resolveDependencies(callback as object);
        }
        
        return callback(...args);
    }
    
    /**
     * Obtains and resolves dependencies for given target
     * 
     * @param {object} target
     * @returns {any[]} Resolved dependencies or empty, if none available
     *
     * @throws {ContainerError}
     * 
     * @protected
     */
    protected resolveDependencies(target: object): any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        const resolved: any[] = []; /* eslint-disable-line @typescript-eslint/no-explicit-any */
        
        const dependencies: Identifier[] = this.getDependencies(target);
        for (const identifier of dependencies) {
            resolved.push(this.resolveDependency(identifier, target));
        }
        
        return resolved;
    }

    /**
     * Resolves dependency that matches given identifier, for given target
     * 
     * @param {Identifier} identifier
     * @param {object} target
     * 
     * @returns {any}
     * 
     * @throws {ContainerError}
     * 
     * @protected
     */
    protected resolveDependency(identifier: Identifier, target: object): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        try {
            // In case that the target is a constructor that has a contextual binding defined
            // for given identifier, then it must be resolved.
            if (this.hasContextualBinding(target as Constructor, identifier)) {
                const binding = this.getContextualBinding(target as Constructor, identifier);
                
                return this.build(binding as Binding);
            }
            
            // Otherwise, just resolve the given binding identifier...
            return this.make(identifier);
        } catch (e) {
            if (e instanceof CircularDependencyError) {
                if (e.cause === undefined) {
                    e.cause = Object.create(null);
                }

                (e.cause as any).target = target; /* eslint-disable-line @typescript-eslint/no-explicit-any */
                (e.cause as any).identifier = identifier; /* eslint-disable-line @typescript-eslint/no-explicit-any */
                
                throw e;
            }

            const reason: string = getErrorMessage(e);
            const options = {
                cause: {
                    identifier: identifier,
                    target: target
                }
            }
            
            throw new ContainerError(`Unable to resolve "${identifier.toString()}" for target "${getNameOrDesc(target as ConstructorLike)}": ${reason}`, options);
        }
    }

    /**
     * Invokes "rebound" callbacks for given identifier
     * 
     * @param {Identifier} identifier
     * 
     * @return {void}
     *
     * @throws {ContainerError}
     * 
     * @protected
     */
    protected rebound(identifier: Identifier): void
    {
        const resolved = this.make(identifier);
        
        const callbacks: ReboundCallback[] = this.getReboundCallbacks(identifier);
        for (const callback of callbacks) {
            callback(resolved, this);
        }
    }

    /**
     * Get "rebound" callbacks for given identifier
     * 
     * @param {Identifier} identifier
     * 
     * @return {ReboundCallback[]}
     * 
     * @protected
     */
    protected getReboundCallbacks(identifier: Identifier): ReboundCallback[]
    {
        return this.reboundCallbacks.get(identifier) ?? [];
    }
    
    /**
     * Invokes the "before" resolved callbacks for given identifier
     * 
     * @param {Identifier} identifier
     * @param {any[]} [args]
     *
     * @return {void}
     * 
     * @protected
     */
    protected fireBeforeResolvedCallbacks(
        identifier: Identifier,
        args: any[] = [], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): void
    {
        const callbacks: BeforeResolvedCallback[] = this.beforeResolvedCallbacks.get(identifier) ?? [];
        
        for (const callback of callbacks) {
            callback(identifier, args, this);
        }
    }

    /**
     * Invokes the "after" resolved callbacks for given identifier
     * 
     * @param {Identifier} identifier
     * 
     * @param {any} resolved
     * 
     * @return {void}
     * 
     * @protected
     */
    protected fireAfterResolvedCallbacks(
        identifier: Identifier,
        resolved: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): void
    {
        const callbacks: AfterResolvedCallback[] = this.afterResolvedCallbacks.get(identifier) ?? [];

        for (const callback of callbacks) {
            callback(identifier, resolved, this);
        }
    }
    
    /**
     * Returns list of extend callbacks for given identifier
     * 
     * @param {Identifier} identifier
     * 
     * @returns {ExtendCallback[]}
     * 
     * @protected
     */
    protected getExtenders(identifier: Identifier): ExtendCallback[]
    {
        return this.extenders.get(this.getAlias(identifier)) ?? [];
    }
    
    /**
     * Determine if given target is buildable
     * 
     * @param {unknown} target
     * 
     * @returns {boolean}
     * 
     * @protected
     */
    protected isBuildable(target: unknown): boolean
    {
        return isConstructor(target);
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
    protected makeBindingEntry(
        identifier: Identifier,
        value: FactoryCallback | Constructor,
        shared: boolean = false
    ): Binding
    {
        return new BindingEntry(identifier, value, shared);
    }

    /**
     * Determine if object is a binding entry
     * 
     * @param {object} target
     * 
     * @returns {boolean}
     * 
     * @protected
     */
    protected isBinding(target: object): boolean
    {
        return isBinding(target);
    }

    /**
     * Determine if target has dependencies defined
     * 
     * @param {object} target
     * 
     * @returns {boolean}
     * 
     * @protected
     */
    protected hasDependencies(target: object): boolean
    {
        return hasDependencies(target);
    }

    /**
     * Returns the defined dependencies for given target
     * 
     * @param {object} target
     * 
     * @returns {Identifier[]}
     * 
     * @protected
     */
    protected getDependencies(target: object): Identifier[]
    {
        return getDependencies(target);
    }

    /**
     * Aborts current make, build or call process, if given target is already in
     * the process of being resolved.
     * 
     * @param {Constructor} target
     * 
     * @throws {CircularDependencyError}
     * 
     * @protected
     */
    protected preventCircularDependency(target: Constructor): void
    {
        // Skip if target is not in the current "resolve" stack. 
        if (!this.resolveStack.has(target)) {
            return;
        }

        // However, if the target is in the current "resolve" stack, it means that the
        // target has a circular dependency to itself. To avoid an infinite loop, the
        // make, build or call process must be aborted.

        // Prepare a string "resolve" stack to make it somewhat easier for developers
        // to understand how we got here...
        const stack: string[] = Array.from(this.resolveStack).map((ctor: Constructor) => {
            return getNameOrDesc(ctor);
        });
        stack.push(getNameOrDesc(target));

        const trace: string = stack.join(' -> ');

        throw new CircularDependencyError(`Circular Dependency for target "${getNameOrDesc(target as ConstructorLike)}". Resolve stack: ${trace}`);
    }
}