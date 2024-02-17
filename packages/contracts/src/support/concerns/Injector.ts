import { Constructor } from "@aedart/contracts";
import Concern from "./Concern";
import Configuration from "./Configuration";
import MustUseConcerns from "./MustUseConcerns";

/**
 * Concerns Injector
 * 
 * Able to inject concerns into a target class and create alias (proxy) properties 
 * and methods to the provided concerns' properties and methods, in the target class.
 * 
 * @see {Concern}
 */
export default interface Injector
{
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
     * @template T = object
     * @template C = {@link Concern}
     * 
     * @param {T} target The target class that concerns classes must be injected into
     * @param {Constructor<C> | Configuration<C>} concerns List of concern classes / injection configurations
     * 
     * @returns {MustUseConcerns<T>} The modified target class
     *
     * @throws {InjectionException}
     */
    inject<
        T = object,
        C = Concern
    >(target: T, ...concerns: (Constructor<C>|Configuration<C>)[]): MustUseConcerns<T>;

    /**
     * Defines the concern classes that must be used by the target class.
     * 
     * **Note**: _Method changes the target class, such that it implements and respects the
     * {@link MustUseConcerns} interface. The original target class' constructor remains the untouched!_
     * 
     * @template T = object
     * 
     * @param {T} target The target class that must define the concern classes to be used 
     * @param {Constructor<Concern>[]} concerns List of concern classes
     * 
     * @returns {MustUseConcerns<T>} The modified target class
     *
     * @throws {InjectionException} If given concern classes conflict with target class' parent concern classes,
     *                              e.g. in case of duplicates. Or, if unable to modify target class.
     */
    defineConcerns<T = object>(target: T, concerns: Constructor<Concern>[]): MustUseConcerns<T>;

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
     * @throws {InjectionException} If unable to define concerns container in target class
     */
    defineContainer<T = object>(target: MustUseConcerns<T>): MustUseConcerns<T>;

    /**
     * Defines "aliases" (proxy properties and methods) in target class' prototype, such that they
     * point to the properties and methods available in the concern classes.
     *
     * **Note**: _Method defines each alias using the {@link defineAlias} method!_
     * 
     * @template T = object
     * 
     * @param {MustUseConcerns<T>} target The target in which "aliases" must be defined in
     * @param {Configuration<Concern>[]} configurations List of concern injection configurations
     * 
     * @returns {MustUseConcerns<T>} The modified target class
     *
     * @throws {InjectionException} If case of alias naming conflicts. Or, if unable to define aliases in target class.
     */
    defineAliases<T = object>(target: MustUseConcerns<T>, configurations: Configuration<Concern>[]): MustUseConcerns<T>;

    /**
     * Defines an "alias" (proxy property or method) in target class' prototype, to a property or method
     * in given concern.
     * 
     * **Note**: _Method will do nothing, if a property or method already exists in the target class' prototype
     * chain, with the same name as given "alias"._
     * 
     * @template T = object
     * 
     * @param {MustUseConcerns<T>} target The target in which "alias" must be defined in
     * @param {PropertyKey} alias Name of the "alias" in the target class (name of the proxy property or method)
     * @param {PropertyKey} key Name of the property or method that the "alias" is for, in the concern class (`source`)
     * @param {Constructor<Concern>} source The concern class that holds the property or methods (`key`)
     * 
     * @returns {boolean} `true` if "alias" was in target class. `false` if not, e.g. a property or method already
     *                    exists in target class' prototype chain, with the same name as the alias.
     *
     * @throws {InjectionException} If unable to define "alias" in target class, e.g. due to failure when obtaining
     *                              or defining [property descriptors]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor#description}.
     */
    defineAlias<T = object>(
        target: MustUseConcerns<T>,
        alias: PropertyKey,
        key: PropertyKey,
        source: Constructor<Concern>
    ): boolean;
}