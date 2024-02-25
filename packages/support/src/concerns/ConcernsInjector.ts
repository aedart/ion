import type {
    ConcernConstructor,
    Injector,
    UsesConcerns,
    Configuration,
    Owner,
    Container,
    Factory,
} from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import {
    CONCERN_CLASSES,
    CONCERNS
} from "@aedart/contracts/support/concerns";
import {
    getAllParentsOfClass,
    getNameOrDesc,
    getClassPropertyDescriptors,
} from "@aedart/support/reflections";
import AlreadyRegisteredError from './exceptions/AlreadyRegisteredError';
import InjectionError from './exceptions/InjectionError';
import UnsafeAliasError from './exceptions/UnsafeAliasError';
import ConcernsContainer from './ConcernsContainer';
import ConfigurationFactory from "./ConfigurationFactory";
import { isUnsafeKey } from "./isUnsafeKey";

/**
 * A map of the concern owner instances and their concerns container
 * 
 * @internal
 * 
 * @type {WeakMap<Owner, Container>}
 */
const CONTAINERS_REGISTRY: WeakMap<Owner, Container> = new WeakMap();

/**
 * TODO: Incomplete
 * 
 * Concerns Injector
 * 
 * @see Injector
 */
export default class ConcernsInjector<T = object> implements Injector<T>
{
    /**
     * The target class
     * 
     * @template T = object
     * @type {T}
     * 
     * @private
     */
    readonly #target: T;

    /**
     * Concern Configuration Factory
     * 
     * @type {Factory}
     * 
     * @protected
     */
    protected factory: Factory;

    /**
     * In-memory cache property descriptors for target class and concern classes
     *
     * @type {WeakMap<ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor, Record<PropertyKey, PropertyDescriptor>>}
     *
     * @private
     */
    #cachedDescriptors: WeakMap<
        ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor,
        Record<PropertyKey, PropertyDescriptor>
    > = new WeakMap();
    
    /**
     * Create a new Concerns Injector instance
     * 
     * @template T = object
     * 
     * @param {T} target The target class that concerns must be injected into
     */
    public constructor(target: T)
    {
        this.#target = target;
        this.factory = this.makeConfigurationFactory();
    }
    
    /**
     * The target class
     *
     * @template T = object
     * 
     * @returns {T}
     */
    public get target(): T
    {
       return this.#target; 
    }
    
    // TODO: INCOMPLETE...
    //
    // /**
    //  * Injects concern classes into the target class and return the modified target.
    //  *
    //  * **Note**: _Method performs injection in the following way:_
    //  *
    //  * _**A**: Defines the concern classes in target class, via {@link defineConcerns}._
    //  *
    //  * _**B**: Defines a concerns container in target class' prototype, via {@link defineContainer}._
    //  *
    //  * _**C**: Defines "aliases" (proxy properties and methods) in target class' prototype, via {@link defineAliases}._
    //  *
    //  * @template T = object The target class that concern classes must be injected into
    //  *
    //  * @param {ConcernConstructor | Configuration} concerns List of concern classes / injection configurations
    //  *
    //  * @returns {UsesConcerns<T>} The modified target class
    //  *
    //  * @throws {InjectionException}
    //  */
    // inject(...concerns: (ConcernConstructor|Configuration)[]): UsesConcerns<T>;
    // {
    //     // TODO: implement this method...
    //    
    //     // Resolve arguments, such that they are of type "concern injection configuration".
    //    
    //     // A) Define the concern classes in target class
    //    
    //     // B) Define a concerns container in target class' prototype
    //    
    //     // C) Define "aliases" (proxy properties and methods) in target class' prototype
    //    
    //     return this.target as UsesConcerns<T>;
    // }

    /**
     * Defines the concern classes that must be used by the target class.
     *
     * **Note**: _Method changes the target class, such that it implements and respects the
     * {@link UsesConcerns} interface._
     *
     * @template T = object
     *
     * @param {T} target The target class that must define the concern classes to be used
     * @param {Constructor<Concern>[]} concerns List of concern classes
     *
     * @returns {UsesConcerns<T>} The modified target class
     *
     * @throws {AlreadyRegisteredError}
     * @throws {InjectionError}
     */
    public defineConcerns<T = object>(target: T, concerns: ConcernConstructor[]): UsesConcerns<T>
    {
        const registry = this.resolveConcernsRegistry(target as object, concerns);
        
        return this.definePropertyInTarget<T>(target, CONCERN_CLASSES, {
            get: function() {
                return registry;
            }
        }) as UsesConcerns<T>;
    }

    /**
     * Defines a concerns {@link Container} in target class' prototype.
     *
     * **Note**: _Method changes the target class, such that it implements and respects the
     * [Owner]{@link import('@aedart/contracts/support/concerns').Owner} interface!_
     *
     * @template T = object
     *
     * @param {UsesConcerns<T>} target The target in which a concerns container must be defined
     *
     * @returns {UsesConcerns<T>} The modified target class
     *
     * @throws {InjectionError} If unable to define concerns container in target class
     */
    public defineContainer<T = object>(target: UsesConcerns<T>): UsesConcerns<T>
    {
        const concerns: ConcernConstructor[] = target[CONCERN_CLASSES];

        this.definePropertyInTarget<T>(target.prototype, CONCERNS, {
            get: function() {
                // @ts-expect-error This = target instance. TypeScript just doesn't understand context here...
                const instance: T & Owner = this; /* eslint-disable-line @typescript-eslint/no-this-alias */

                if (!CONTAINERS_REGISTRY.has(instance)) {
                    CONTAINERS_REGISTRY.set(instance, new ConcernsContainer(instance, concerns));
                }

                return CONTAINERS_REGISTRY.get(instance);
            }
        });
        
        return target;
    }

    // /**
    //  * Defines "aliases" (proxy properties and methods) in target class' prototype, such that they
    //  * point to the properties and methods available in the concern classes.
    //  *
    //  * **Note**: _Method defines each alias using the {@link defineAlias} method!_
    //  *
    //  * @template T = object
    //  *
    //  * @param {UsesConcerns<T>} target The target in which "aliases" must be defined in
    //  * @param {Configuration[]} configurations List of concern injection configurations
    //  *
    //  * @returns {UsesConcerns<T>} The modified target class
    //  *
    //  * @throws {AliasConflictException} If case of alias naming conflicts.
    //  * @throws {InjectionException} If unable to define aliases in target class.
    //  */
    // defineAliases<T = object>(target: UsesConcerns<T>, configurations: Configuration[]): UsesConcerns<T>
    // {
    //     // TODO: implement this method...
    //          // TODO: cache target property descriptors
    //          // TODO: cache concern property descriptors
    //          // TODO:  - delete concern property descriptors after its aliases are defined
    //          // TODO: clear all cached descriptors, after all aliases defined
    //
    //     return target;
    // }

    /**
     * Defines an "alias" (proxy property or method) in target class' prototype, which points to a property or method
     * in the given concern.
     *
     * **Note**: _Method will do nothing, if a property or method already exists in the target class' prototype
     * chain, with the same name as given "alias"._
     *
     * @template T = object
     *
     * @param {UsesConcerns<T>} target The target in which "alias" must be defined in
     * @param {PropertyKey} alias Name of the "alias" in the target class (name of the proxy property or method)
     * @param {PropertyKey} key Name of the property or method that the "alias" points to, in the concern class (`source`)
     * @param {Constructor} source The source concern class that contains the property or methods that is pointed to (`key`)
     *
     * @returns {boolean} `true` if "alias" was in target class. `false` if a property or method already exists in the
     *                     target, with the same name as the "alias".
     *
     * @throws {UnsafeAliasError} If an alias points to an "unsafe" property or method in the source concern class.
     * @throws {InjectionException} If unable to define "alias" in target class.
     */
    public defineAlias<T = object>(
        target: UsesConcerns<T>,
        alias: PropertyKey,
        key: PropertyKey,
        source: ConcernConstructor
    ): boolean
    {
        // Abort if key is "unsafe"
        if (this.isUnsafe(key)) {
            throw new UnsafeAliasError(target, source, alias, key);
        }

        // Skip if a property key already exists with same name as the "alias"
        const targetDescriptors = this.getDescriptorsFor(target);
        if (Reflect.has(targetDescriptors, alias)) {
            return false;
        }
        
        // Abort if unable to find descriptor that matches given key in concern class.
        const concernDescriptors = this.getDescriptorsFor(source);
        if (!Reflect.has(concernDescriptors, key)) {
            throw new InjectionError(target, source, `"${key.toString()}" does not exist in concern ${getNameOrDesc(source)} - attempted aliased as "${alias.toString()}" in target ${getNameOrDesc(target)}`);
        }

        // Define the proxy property or method, using the concern's property descriptor to determine what must be defined.
        const proxy = this.resolveProxyDescriptor(key, source, concernDescriptors[key])

        return this.definePropertyInTarget<T>(target.prototype, alias, proxy) !== undefined;
    }

    /**
     * Normalises given concerns into a list of concern configurations  
     * 
     * @param {(ConcernConstructor | Configuration)[]} concerns
     * 
     * @returns {Configuration[]}
     * 
     * @throws {InjectionError}
     */
    public normalise(concerns: (ConcernConstructor|Configuration)[]): Configuration[]
    {
        const output: Configuration[] = [];
        
        for (const entry of concerns) {
            output.push(this.normaliseEntry(entry));
        }
        
        return output;
    }

    /*****************************************************************
     * Internals
     ****************************************************************/

    /**
     * Resolves the concern classes to be registered (registry), for the given target
     *
     * **Note**: _Method ensures that if target already has concern classes defined, then those
     * are merged into the resulting list._
     *
     * @param {object} target
     * @param {ConcernConstructor[]} concerns
     *
     * @returns {ConcernConstructor[]} Registry with concern classes that are ready to be registered in given target
     *
     * @throws {AlreadyRegisteredError} If a concern has already been registered in the target
     *
     * @protected
     */
    protected resolveConcernsRegistry(target: object, concerns: ConcernConstructor[]): ConcernConstructor[]
    {
        // Obtain evt. previous defined concern classes in target.
        const alreadyRegistered: ConcernConstructor[] = (Reflect.has(target as object, CONCERN_CLASSES))
            ? target[CONCERN_CLASSES as keyof typeof target] as ConcernConstructor[]
            : [];

        // Make a registry of concern classes to be registered in given target
        const registry: ConcernConstructor[] = [ ...alreadyRegistered ];
        for (const concern of concerns) {

            // Fail if concern is already registered
            if (registry.includes(concern)) {
                const source = this.findSourceOf(concern, target as object, true);
                throw new AlreadyRegisteredError(target as ConstructorOrAbstractConstructor, concern, source as ConstructorOrAbstractConstructor);
            }

            registry.push(concern);
        }

        return registry;
    }

    /**
     * Normalises the given entry into a concern configuration
     *
     * @param {ConcernConstructor | Configuration} entry
     *
     * @returns {Configuration}
     *
     * @throws {InjectionError}
     * 
     * @protected
     */
    protected normaliseEntry(entry: ConcernConstructor|Configuration): Configuration
    {
        return this.factory.make(this.target as object, entry);
    }
    
    /**
     * Defines a property in given target
     * 
     * @template T = object
     * 
     * @param {T} target
     * @param {PropertyKey} property
     * @param {PropertyDescriptor} descriptor
     * @param {string} [failMessage]
     * 
     * @returns {T}
     * 
     * @throws {InjectionError}
     * 
     * @protected
     */
    protected definePropertyInTarget<T = object>(
        target: T,
        property: PropertyKey,
        descriptor: PropertyDescriptor,
        failMessage?: string
    ): T
    {
        const wasDefined: boolean = Reflect.defineProperty((target as object), property, descriptor);

        if (!wasDefined) {
            const reason: string = failMessage || `Unable to define "${property.toString()}" property in target ${getNameOrDesc(target as ConstructorOrAbstractConstructor)}`;
            throw new InjectionError(target as ConstructorOrAbstractConstructor, null, reason);
        }

        return target;
    }
    
    /**
     * Find the source class where given concern is registered
     *
     * @param {ConcernConstructor} concern
     * @param {object} target
     * @param {boolean} [includeTarget=false]
     *
     * @returns {object | null} The source class, e.g. parent of target class, or `null` if concern is not registered
     *                          in target or target's parents.
     *
     * @protected
     */
    protected findSourceOf(concern: ConcernConstructor, target: object, includeTarget: boolean = false): object | null
    {
        const parents = getAllParentsOfClass(target as ConstructorOrAbstractConstructor, includeTarget).reverse();

        for (const parent of parents) {
            if (Reflect.has(parent, CONCERN_CLASSES) && (parent[CONCERN_CLASSES as keyof typeof parent] as ConcernConstructor[]).includes(concern)) {
                return parent;
            }
        }

        return null;
    }

    /**
     * Resolves the proxy property descriptor for given key in source concern
     *
     * @param {PropertyKey} key
     * @param {ConcernConstructor} source
     * @param {PropertyDescriptor} keyDescriptor Descriptor of `key` in `source`
     *
     * @returns {PropertyDescriptor} Descriptor to be used for defining alias in a target class
     *
     * @protected
     */
    protected resolveProxyDescriptor(key: PropertyKey, source: ConcernConstructor, keyDescriptor: PropertyDescriptor): PropertyDescriptor
    {
        const proxy: PropertyDescriptor = Object.assign(Object.create(null), {
            configurable: keyDescriptor.configurable,
            enumerable: keyDescriptor.enumerable,
            // writable: keyDescriptor.writable // Do not specify here...            
        });

        // A descriptor can only have an accessor, a value or writable attribute. Depending on the "value"
        // a different kind of proxy must be defined.
        const hasValue: boolean = Reflect.has(keyDescriptor, 'value');

        if (hasValue && typeof keyDescriptor.value == 'function') {
            proxy.value = this.makeMethodProxy(key, source);
        } else if (hasValue) {
            // When value is not a function, it could be a writable attribute.
            // To alias such a property, we first define a getter for it.
            proxy.get = this.makeGetPropertyProxy(key, source);

            // Secondly, if the property is writable, then define a setter for
            if (keyDescriptor.writable) {
                proxy.set = this.makeSetPropertyProxy(key, source);
            }
        } else {
            // Otherwise, the property can a getter and or a setter...
            if (Reflect.has(keyDescriptor, 'get')) {
                proxy.get = this.makeGetPropertyProxy(key, source);
            }

            if (Reflect.has(keyDescriptor, 'set')) {
                proxy.set = this.makeSetPropertyProxy(key, source);
            }
        }

        return proxy;
    }
    
    /**
     * Returns a new proxy "method" for given method in this concern
     *
     * @param {PropertyKey} method
     * @param {ConcernConstructor} concern
     *
     * @returns {(...args: any[]) => any}
     *
     * @protected
     */
    protected makeMethodProxy(method: PropertyKey, concern: ConcernConstructor)
    {
        return function(
            ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        {
            // @ts-expect-error This = concern instance
            return (this as Owner)[CONCERNS].call(concern, method, ...args);
        }
    }

    /**
     * Returns a new proxy "get" for given property in this concern
     *
     * @param {PropertyKey} property
     * @param {ConcernConstructor} concern
     *
     * @returns {() => any}
     *
     * @protected
     */
    protected makeGetPropertyProxy(property: PropertyKey, concern: ConcernConstructor)
    {
        return function(): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        {
            // @ts-expect-error This = concern instance
            return (this as Owner)[CONCERNS].getProperty(concern, property);
        }
    }

    /**
     * Returns a new proxy "set" for given property in this concern
     *
     * @param {PropertyKey} property
     * @param {ConcernConstructor} concern
     *
     * @returns {(value: any) => void}
     *
     * @protected
     */
    protected makeSetPropertyProxy(property: PropertyKey, concern: ConcernConstructor)
    {
        return function(
            value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ): void
        {
            // @ts-expect-error This = concern instance
            (this as Owner)[CONCERNS].setProperty(concern, property, value);
        }
    }

    /**
     * Returns property descriptors for given target class (recursively)
     *
     * @param {ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {boolean} [force=false] If `true` then method will not return evt. cached descriptors.
     * @param {boolean} [cache=false] Caches the descriptors if `true`.
     *
     * @returns {Record<PropertyKey, PropertyDescriptor>}
     *
     * @protected
     */
    protected getDescriptorsFor(
        target: ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor,
        force: boolean = false,
        cache: boolean = false
    ): Record<PropertyKey, PropertyDescriptor>
    {
        if (!force && this.#cachedDescriptors.has(target)) {
            return this.#cachedDescriptors.get(target) as Record<PropertyKey, PropertyDescriptor>;
        }

        const descriptors = getClassPropertyDescriptors(target, true);
        if (cache) {
            this.#cachedDescriptors.set(target, descriptors);
        }

        return descriptors;
    }

    /**
     * Deletes cached property descriptors for target
     *
     * @param {ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor} target
     *
     * @returns {boolean} `true` if cached descriptors were removed, `false` if none were cached
     *
     * @protected
     */
    protected deleteCachedDescriptorsFor(target: ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor): boolean
    {
        return this.#cachedDescriptors.delete(target);
    }

    /**
     * Clears all cached property descriptors
     *
     * @protected
     */
    protected clearCachedDescriptors(): void
    {
        this.#cachedDescriptors = new WeakMap();
    }

    /**
     * Returns a new concern configuration factory instance
     * 
     * @returns {Factory}
     * 
     * @protected
     */
    protected makeConfigurationFactory(): Factory
    {
        return new ConfigurationFactory();
    }

    /**
     * Determine if key is "unsafe"
     *
     * @param {PropertyKey} key
     *
     * @returns {boolean}
     *
     * @protected
     */
    protected isUnsafe(key: PropertyKey): boolean
    {
        return isUnsafeKey(key);
    }
}