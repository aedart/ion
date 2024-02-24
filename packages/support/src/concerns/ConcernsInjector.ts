import type {
    ConcernConstructor,
    Injector,
    MustUseConcerns,
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
    getNameOrDesc
} from "@aedart/support/reflections";
import {
    AlreadyRegisteredError,
    InjectionError
} from "./exceptions";
import ConcernsContainer from './ConcernsContainer';
import ConfigurationFactory from "./ConfigurationFactory";

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
    //  * @returns {MustUseConcerns<T>} The modified target class
    //  *
    //  * @throws {InjectionException}
    //  */
    // inject(...concerns: (ConcernConstructor|Configuration)[]): MustUseConcerns<T>;
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
    //     return this.target as MustUseConcerns<T>;
    // }

    /**
     * Defines the concern classes that must be used by the target class.
     *
     * **Note**: _Method changes the target class, such that it implements and respects the
     * {@link MustUseConcerns} interface._
     *
     * @template T = object
     *
     * @param {T} target The target class that must define the concern classes to be used
     * @param {Constructor<Concern>[]} concerns List of concern classes
     *
     * @returns {MustUseConcerns<T>} The modified target class
     *
     * @throws {AlreadyRegisteredError}
     * @throws {InjectionError}
     */
    public defineConcerns<T = object>(target: T, concerns: ConcernConstructor[]): MustUseConcerns<T>
    {
        const registry = this.resolveConcernsRegistry(target as object, concerns);
        
        return this.definePropertyInTarget<T>(target, CONCERN_CLASSES, {
            get: function() {
                return registry;
            }
        }) as MustUseConcerns<T>;
    }

    /**
     * Defines a concerns {@link Container} in target class' prototype.
     *
     * **Note**: _Method changes the target class, such that it implements and respects the
     * [Owner]{@link import('@aedart/contracts/support/concerns').Owner} interface!_
     *
     * @template T = object
     *
     * @param {MustUseConcerns<T>} target The target in which a concerns container must be defined
     *
     * @returns {MustUseConcerns<T>} The modified target class
     *
     * @throws {InjectionError} If unable to define concerns container in target class
     */
    public defineContainer<T = object>(target: MustUseConcerns<T>): MustUseConcerns<T>
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
    //  * @param {MustUseConcerns<T>} target The target in which "aliases" must be defined in
    //  * @param {Configuration<Concern>[]} configurations List of concern injection configurations
    //  *
    //  * @returns {MustUseConcerns<T>} The modified target class
    //  *
    //  * @throws {InjectionException} If case of alias naming conflicts. Or, if unable to define aliases in target class.
    //  */
    // public defineAliases<T = object>(target: MustUseConcerns<T>, configurations: Configuration<Concern>[]): MustUseConcerns<T>
    // {
    //     // TODO: implement this method...
    //
    //     return target;
    // }
    //
    // /**
    //  * Defines an "alias" (proxy property or method) in target class' prototype, to a property or method
    //  * in given concern.
    //  *
    //  * **Note**: _Method will do nothing, if a property or method already exists in the target class' prototype
    //  * chain, with the same name as given "alias"._
    //  *
    //  * @template T = object
    //  *
    //  * @param {MustUseConcerns<T>} target The target in which "alias" must be defined in
    //  * @param {PropertyKey} alias Name of the "alias" in the target class (name of the proxy property or method)
    //  * @param {PropertyKey} key Name of the property or method that the "alias" is for, in the concern class (`source`)
    //  * @param {Constructor<Concern>} source The concern class that holds the property or methods (`key`)
    //  *
    //  * @returns {boolean} `true` if "alias" was in target class. `false` if not, e.g. a property or method already
    //  *                    exists in target class' prototype chain, with the same name as the alias.
    //  *
    //  * @throws {UnsafeAliasException} If an alias points to an "unsafe" property or method in concern
    //  * @throws {InjectionException} If unable to define "alias" in target class, e.g. due to failure when obtaining
    //  *                              or defining [property descriptors]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor#description}.
    //  */
    // public defineAlias<T = object>(
    //     target: MustUseConcerns<T>,
    //     alias: PropertyKey,
    //     key: PropertyKey,
    //     source: Constructor<Concern>
    // ): boolean
    // {
    //     // TODO: implement this method...
    //
    //     return false;
    // }

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
}