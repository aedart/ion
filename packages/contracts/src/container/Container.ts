import {
    Callback,
    Constructor,
    ClassMethodReference
} from "@aedart/contracts";
import { CallbackWrapper } from "@aedart/contracts/support";
import {
    Alias,
    Identifier,
    FactoryCallback,
    ExtendCallback,
    BeforeResolvedCallback,
    AfterResolvedCallback,
} from "./types";
import Binding from "./Binding";

/**
 * Service Container
 * 
 * Adaptation of Psr's `ContainerInterface`, and Laravel's service `Container`.
 * 
 * @see https://www.php-fig.org/psr/psr-11/#31-psrcontainercontainerinterface
 * @see https://github.com/laravel/framework/blob/master/src/Illuminate/Contracts/Container/Container.php
 */
export default interface Container
{
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
    bind(identifier: Identifier, concrete?: FactoryCallback | Constructor, shared?: boolean): this;

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
    bindIf(identifier: Identifier, concrete?: FactoryCallback | Constructor, shared?: boolean): this;

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
    singleton(identifier: Identifier, concrete?: FactoryCallback | Constructor): this;

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
    singletonIf(identifier: Identifier, concrete?: FactoryCallback | Constructor): this;

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
    instance<T = object>(identifier: Identifier, instance: T): T;
    
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
    >(identifier: Identifier): T;

    /**
     * Determine if an entry is registered for given identifier.
     * 
     * @param {Identifier} identifier
     * 
     * @returns {boolean}
     */
    has(identifier: Identifier): boolean;

    /**
     * Alias for {@link has}
     * 
     * @param {Identifier} identifier
     * 
     * @returns {boolean}
     */
    bound(identifier: Identifier): boolean;

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
    alias(identifier: Identifier, alias: Alias): this;

    /**
     * Determine if identifier is an alias
     *
     * @param {Identifier} identifier
     *
     * @return {boolean}
     */
    isAlias(identifier: Identifier): boolean;
    
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
    >(identifier: Identifier, args?: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */): T;

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
    >(identifier: Identifier, args?: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */, defaultValue?: D): T | D;

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
    build<T = object>(concrete: Constructor<T> | Binding<T>): T;

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
    call(method: Callback | CallbackWrapper | ClassMethodReference, args: any[]): any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

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
    extend(identifier: Identifier, callback: ExtendCallback): this;
    
    /**
     * Forget binding and resolved instance for given identifier  
     * 
     * @param {Identifier} identifier
     * 
     * @returns {boolean}
     */
    forget(identifier: Identifier): boolean;
    
    /**
     * Flush container of all bindings and resolved instances
     * 
     * @returns {void}
     */
    flush(): void;

    /**
     * Determine if identifier has been resolved
     * 
     * @param {Identifier} identifier
     * 
     * @return {boolean}
     */
    isResolved(identifier: Identifier): boolean;

    /**
     * Register a callback to be invoked before a binding is resolved
     * 
     * @param {Identifier} identifier
     * @param {BeforeResolvedCallback} callback
     * 
     * @return {this}
     */
    before(identifier: Identifier, callback: BeforeResolvedCallback): this;

    /**
     * Register a callback to be invoked after a binding has been resolved
     * 
     * @param {Identifier} identifier
     * @param {AfterResolvedCallback} callback
     * 
     * @return {this}
     */
    after(identifier: Identifier, callback: AfterResolvedCallback): this;
}