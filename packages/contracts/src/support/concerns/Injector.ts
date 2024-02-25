import ConcernConstructor from "./ConcernConstructor";
import Configuration from "./Configuration";
import UsesConcerns from "./UsesConcerns";

/**
 * Concerns Injector
 * 
 * Able to inject concerns into a target class and create alias (proxy) properties 
 * and methods to the provided concerns' properties and methods, in the target class.
 * 
 * @template T = object The target class that concern classes must be injected into
 * 
 * @see {Concern}
 */
export default interface Injector<T = object>
{
    /**
     * The target class
     * 
     * @returns {T}
     */
    get target(): T;
    
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
     * @param {ConcernConstructor | Configuration} concerns List of concern classes / injection configurations
     * 
     * @returns {UsesConcerns<T>} The modified target class
     *
     * @throws {InjectionException}
     */
    inject(...concerns: (ConcernConstructor|Configuration)[]): UsesConcerns<T>;

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
     * @throws {AlreadyRegisteredException}
     * @throws {InjectionException}
     */
    defineConcerns<T = object>(target: T, concerns: ConcernConstructor[]): UsesConcerns<T>;

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
     * @throws {InjectionException} If unable to define concerns container in target class
     */
    defineContainer<T = object>(target: UsesConcerns<T>): UsesConcerns<T>;

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
     * @throws {AliasConflictException} If case of alias naming conflicts.
     * @throws {InjectionException} If unable to define aliases in target class.
     */
    defineAliases<T = object>(target: UsesConcerns<T>, configurations: Configuration[]): UsesConcerns<T>;

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
     * @throws {UnsafeAliasException} If an alias points to an "unsafe" property or method in the source concern class.
     * @throws {InjectionException} If unable to define "alias" in target class.
     */
    defineAlias<T = object>(
        target: UsesConcerns<T>,
        alias: PropertyKey,
        key: PropertyKey,
        source: ConcernConstructor
    ): boolean;
}