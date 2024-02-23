import type {
    Concern,
    ConcernConstructor,
    Injector,
    MustUseConcerns,
    Configuration,
} from "@aedart/contracts/support/concerns";
import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import {
    ALWAYS_HIDDEN,
    CONCERN_CLASSES
} from "@aedart/contracts/support/concerns";
import {
    getAllParentsOfClass,
    getNameOrDesc
} from "@aedart/support/reflections";
import {
    AlreadyRegisteredError,
    InjectionError
} from "./exceptions";

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
     * Create a new Concerns Injector instance
     * 
     * @template T = object
     * 
     * @param {T} target The target class that concerns must be injected into
     */
    public constructor(target: T)
    {
        this.#target = target;
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
    //  * @template C = {@link Concern}
    //  *
    //  * @param {Constructor<C> | Configuration<C>} concerns List of concern classes / injection configurations
    //  *
    //  * @returns {MustUseConcerns<T>} The modified target class
    //  *
    //  * @throws {InjectionException}
    //  */
    // public inject<C = Concern>(...concerns: (Constructor<C>|Configuration<C>)[]): MustUseConcerns<T>
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
        // Obtain evt. previous defined concern classes in target.
        const alreadyRegistered: ConcernConstructor[] = (Reflect.has(target as object, CONCERN_CLASSES))
            ? target[CONCERN_CLASSES as keyof typeof target] as ConcernConstructor[]
            : [];

        // Make a registry of concern classes to be registered in given target
        const registry: ConcernConstructor[] = [ ...alreadyRegistered ];
        for (const concern of concerns) {

            // Fail if concern is already registered
            if (registry.includes(concern)) {
                const source = this.findSourceOf(concern, target as object);
                throw new AlreadyRegisteredError(target as ConstructorOrAbstractConstructor, concern, source as ConstructorOrAbstractConstructor);
            }

            registry.push(concern);
        }
        
        // Finally, define concern classes property
        return this.defineConcernClassesProperty<T>(target, registry);
    }
    
    //
    // /**
    //  * Defines a concerns {@link Container} in target class' prototype.
    //  *
    //  * **Note**: _Method changes the target class, such that it implements and respects the
    //  * [Owner]{@link import('@aedart/contracts/support/concerns').Owner} interface!_
    //  *
    //  * @template T = object
    //  *
    //  * @param {MustUseConcerns<T>} target The target in which a concerns container must be defined
    //  *
    //  * @returns {MustUseConcerns<T>} The modified target class
    //  *
    //  * @throws {InjectionException} If unable to define concerns container in target class
    //  */
    // public defineContainer<T = object>(target: MustUseConcerns<T>): MustUseConcerns<T>
    // {
    //     // TODO: implement this method...
    //
    //     return target;
    // }
    //
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


    /*****************************************************************
     * Internals
     ****************************************************************/

    /**
     * Defines the {@link CONCERN_CLASSES} static property in given target
     *
     * @template T = object
     *
     * @param {T} target
     * @param {ConcernConstructor[]} registry
     *
     * @returns {MustUseConcerns<T>}
     *
     * @throws {InjectionError}
     * 
     * @protected
     */
    protected defineConcernClassesProperty<T = object>(target: T, registry: ConcernConstructor[]): MustUseConcerns<T>
    {
        // Define static property that contains concern classes in target.
        const wasDefined: boolean = Reflect.defineProperty(target as object, CONCERN_CLASSES, {
            get: function() {
                return registry;
            }
        });

        if (!wasDefined) {
            const reason: string = `Unable to define concern classes in target ${getNameOrDesc(target as ConstructorOrAbstractConstructor)}`;
            throw new InjectionError(target as ConstructorOrAbstractConstructor, null, reason);
        }

        // Finally, return the modified target...
        return target as MustUseConcerns<T>;
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
            if (Reflect.has(target, CONCERN_CLASSES) && (target[CONCERN_CLASSES as keyof typeof target] as ConcernConstructor[]).includes(concern)) {
                return parent;
            }
        }

        return null;
    }

    // ------------------------------------------------------------------------- //
    // TODO: Was previously part of AbstractConcern, but the logic should belong here
    // TODO: instead...

    /**
     * TODO: Adapt this...
     * 
     * In-memory cache of resolved keys (properties and methods), which
     * are offered by concern(s) and can be aliased.
     *
     * @type {WeakMap<ThisType<ConcernConstructor>, PropertyKey[]>}
     *
     * @protected
     * @static
     */
    protected static resolvedConcernKeys: WeakMap<ThisType<ConcernConstructor>, PropertyKey[]> = new WeakMap();

    /**
     * TODO: Adapt this...
     * 
     * Removes keys that should remain hidden
     *
     * @see ALWAYS_HIDDEN
     *
     * @param {PropertyKey[]} keys
     *
     * @returns {PropertyKey[]}
     *
     * @protected
     * @static
     */
    protected static removeAlwaysHiddenKeys(keys: PropertyKey[]): PropertyKey[]
    {
        return keys.filter((key: PropertyKey) => {
            return !ALWAYS_HIDDEN.includes(key);
        });
    }

    /**
     * TODO: Adapt this...
     * 
     * Remember the resolved keys (properties and methods) for given target concern class
     *
     * @param {ThisType<ConcernConstructor>} concern
     * @param {() => PropertyKey[]} callback
     * @param {boolean} [force=false]
     *
     * @returns {PropertyKey[]}
     *
     * @protected
     * @static
     */
    protected static rememberConcernKeys(
        concern: ThisType<ConcernConstructor>,
        callback: () => PropertyKey[],
        force: boolean = false
    ): PropertyKey[]
    {
        if (!force && this.resolvedConcernKeys.has(concern)) {
            return this.resolvedConcernKeys.get(concern) as PropertyKey[];
        }

        const keys: PropertyKey[] = callback();

        this.resolvedConcernKeys.set(concern, keys);

        return keys;
    }
}