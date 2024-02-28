import type {
    ConcernConstructor,
    Injector,
    UsesConcerns,
    Configuration,
    ShorthandConfiguration,
    Owner,
    Container,
    DescriptorsCache,
    Factory,
    Alias,
    Aliases,
    Resolver,
} from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import {
    CONCERN_CLASSES,
    ALIASES,
    CONCERNS
} from "@aedart/contracts/support/concerns";
import {
    getAllParentsOfClass,
    getNameOrDesc
} from "@aedart/support/reflections";
import AliasConflictError from './exceptions/AliasConflictError';
import AlreadyRegisteredError from './exceptions/AlreadyRegisteredError';
import InjectionError from './exceptions/InjectionError';
import UnsafeAliasError from './exceptions/UnsafeAliasError';
import ConcernsContainer from './ConcernsContainer';
import ConfigurationFactory from "./ConfigurationFactory";
import Descriptors from "./Descriptors";
import { isUnsafeKey } from "./isUnsafeKey";
import ProxyResolver from "./ProxyResolver";

/**
 * A map of the concern owner instances and their concerns container
 * 
 * @internal
 * 
 * @type {WeakMap<Owner, Container>}
 */
const CONTAINERS_REGISTRY: WeakMap<Owner, Container> = new WeakMap();

/**
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
     * Descriptors Cache
     * 
     * @type {DescriptorsCache}
     * 
     * @protected
     */
    protected descriptors: DescriptorsCache;

    /**
     * Proxy Descriptor Resolver
     * 
     * @type {Resolver}
     * 
     * @protected
     */
    protected proxyResolver: Resolver;

    /**
     * Create a new Concerns Injector instance
     *
     * @template T = object
     * 
     * @param {T} target The target class that concerns must be injected into
     * @param {Factory} [factory]
     * @param {Resolver} [resolver]
     * @param {DescriptorsCache} [descriptors]
     */
    public constructor(
        target: T,
        factory?: Factory,
        resolver?: Resolver,
        descriptors?: DescriptorsCache
    )
    {
        this.#target = target;
        this.factory = factory || new ConfigurationFactory();
        this.proxyResolver = resolver || new ProxyResolver();
        this.descriptors = descriptors || new Descriptors();
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

    /**
     * Injects concern classes into the target class and return the modified target.
     *
     * **Note**: _Method performs injection in the following way:_
     *
     * _**A**: Defines the concern classes in target class, via {@link defineConcerns}._
     *
     * _**B**: Defines a concerns container in target class' prototype, via {@link defineContainer}._
     *
     * _**C**: Defines "aliases" (proxy properties and methods) in target class' prototype, via {@link defineAliases}._
     *
     * @template T = object The target class that concern classes must be injected into
     *
     * @param {...ConcernConstructor | Configuration | ShorthandConfiguration} concerns List of concern classes / injection configurations
     *
     * @returns {UsesConcerns<T>} The modified target class
     *
     * @throws {InjectionException}
     */
    inject(...concerns: (ConcernConstructor|Configuration|ShorthandConfiguration)[]): UsesConcerns<T>
    {
        const configurations: Configuration[] = this.normalise(concerns);
        const concernClasses: ConcernConstructor[] = configurations.map((configuration) => configuration.concern);

        const modifiedTarget = this.defineAliases(
            this.defineContainer(
                this.defineConcerns(this.target, concernClasses)
            ),
            configurations
        );

        // Clear evt. cached descriptors...
        this.descriptors.clear();

        return modifiedTarget;
    }

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

    /**
     * Defines "aliases" (proxy properties and methods) in target class' prototype, such that they
     * point to the properties and methods available in the concern classes.
     *
     * **Note**: _Method defines each alias using the {@link defineAlias} method!_
     *
     * @template T = object
     *
     * @param {UsesConcerns<T>} target The target in which "aliases" must be defined in
     * @param {Configuration[]} configurations List of concern injection configurations
     *
     * @returns {UsesConcerns<T>} The modified target class
     *
     * @throws {AliasConflictError} If case of alias naming conflicts.
     * @throws {InjectionError} If unable to define aliases in target class.
     */
    defineAliases<T = object>(target: UsesConcerns<T>, configurations: Configuration[]): UsesConcerns<T>
    {
        const applied: Alias[] = [];
        
        // Obtain previous applied aliases, form the target's parents.
        const appliedByParents: Map<Alias, UsesConcerns> = this.getAllAppliedAliases(target as UsesConcerns);

        this.descriptors.rememberDuring(target, () => {
            for (const configuration of configurations) {
                if (!configuration.allowAliases) {
                    continue;
                }

                this.descriptors.rememberDuring(configuration.concern, () => {
                    // Process the configuration aliases and define them. Merge returned aliases with the
                    // applied aliases for the target class.
                    const newApplied: Alias[] = this.processAliases(
                        target as UsesConcerns,
                        configuration,
                        applied,
                        appliedByParents
                    );

                    applied.push(...newApplied);
                });
            }
        });

        // (Re)define the "ALIASES" static property in target.
        return this.definePropertyInTarget(target, ALIASES, {
            get: function() {
                return applied;
            }
        });
    }

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
        const targetDescriptors = this.descriptors.get(target);
        if (Reflect.has(targetDescriptors, alias)) {
            return false;
        }
        
        // Abort if unable to find descriptor that matches given key in concern class.
        const concernDescriptors = this.descriptors.get(source);
        if (!Reflect.has(concernDescriptors, key)) {
            throw new InjectionError(target, source, `"${key.toString()}" does not exist in concern ${getNameOrDesc(source)} - attempted aliased as "${alias.toString()}" in target ${getNameOrDesc(target)}`);
        }

        // Define the proxy property or method, using the concern's property descriptor to determine what must be defined.
        const proxy = this.proxyResolver.resolve(key, source, concernDescriptors[key]);

        return this.definePropertyInTarget<T>(target.prototype, alias, proxy) !== undefined;
    }

    /**
     * Normalises given concerns into a list of concern configurations  
     * 
     * @param {(ConcernConstructor | Configuration | ShorthandConfiguration)[]} concerns
     * 
     * @returns {Configuration[]}
     * 
     * @throws {InjectionError}
     */
    public normalise(concerns: (ConcernConstructor|Configuration|ShorthandConfiguration)[]): Configuration[]
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
     * @param {ConcernConstructor | Configuration | ShorthandConfiguration} entry
     *
     * @returns {Configuration}
     *
     * @throws {InjectionError}
     * 
     * @protected
     */
    protected normaliseEntry(entry: ConcernConstructor|Configuration|ShorthandConfiguration): Configuration
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
     * Returns all applied aliases for given target and its parent classes
     *
     * @param {UsesConcerns} target
     * @param {boolean} [includeTarget=false]
     *
     * @return {Map<Alias, UsesConcerns>}
     *
     * @protected
     */
    protected getAllAppliedAliases(target: UsesConcerns, includeTarget: boolean = false): Map<Alias, UsesConcerns>
    {
        const output: Map<Alias, UsesConcerns> = new Map();

        const parents = getAllParentsOfClass(target as ConstructorOrAbstractConstructor, includeTarget).reverse();
        for (const parent of parents) {
            if (!Reflect.has(parent, ALIASES)) {
                continue;
            }

            (parent as UsesConcerns)[ALIASES].forEach((alias) => {
                output.set(alias, (parent as UsesConcerns));
            });
        }

        return output;
    }

    /**
     * Processes given configuration's aliases by defining them
     *
     * @param {UsesConcerns} target
     * @param {Configuration} configuration
     * @param {Alias[]} applied
     * @param {Map<Alias, UsesConcerns>} appliedByParents
     *
     * @return {Alias[]} New applied aliases (does not include aliases from `applied` argument)
     *
     * @protected
     *
     * @throws {AliasConflictError}
     */
    protected processAliases(
        target: UsesConcerns,
        configuration: Configuration,
        applied: Alias[],
        appliedByParents: Map<Alias, UsesConcerns>
    ): Alias[]
    {
        // Aliases that have been applied by this method...
        const output: Alias[] = [];
        
        // Already applied aliases in target + aliases applied by this method
        const alreadyApplied: Alias[] = [...applied];
        
        const aliases: Aliases = configuration.aliases as Aliases;
        const properties: PropertyKey[] = Reflect.ownKeys(aliases);

        for (const key of properties) {
            const alias: Alias = aliases[key as keyof typeof aliases] as Alias;

            // Ensure that alias does not conflict with previous applied aliases.
            this.assertAliasDoesNotConflict(
                target as UsesConcerns,
                configuration.concern,
                alias,
                key,
                alreadyApplied, // Applied aliases in this context...
                appliedByParents
            );

            // Define the alias in target and mark it as "applied"
            this.defineAlias(target, alias, key, configuration.concern);

            alreadyApplied.push(alias);
            output.push(alias);
        }

        return output;
    }
    
    /**
     * Assert that given alias does not conflict with an already applied alias
     *
     * @param {UsesConcerns} target
     * @param {ConcernConstructor} concern
     * @param {Alias} alias
     * @param {PropertyKey} key
     * @param {Alias} applied Aliases that are applied directly in the target class
     * @param {Map<Alias, UsesConcerns>} appliedByParents Aliases that are applied in target's parents
     *
     * @protected
     *
     * @throws {AliasConflictError}
     */
    protected assertAliasDoesNotConflict(
        target: UsesConcerns,
        concern: ConcernConstructor,
        alias: Alias,
        key: PropertyKey,
        applied: Alias[],
        appliedByParents: Map<Alias, UsesConcerns>
    ): void
    {
        const isAppliedByTarget: boolean = applied.includes(alias);
        const isAppliedByParents: boolean = appliedByParents.has(alias);

        if (isAppliedByTarget || isAppliedByParents) {
            const source: UsesConcerns = (isAppliedByTarget)
                ? target as UsesConcerns
                : appliedByParents.get(alias) as UsesConcerns;

            throw new AliasConflictError(target, concern, alias, key, source);
        }
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