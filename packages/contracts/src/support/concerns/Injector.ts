import { Constructor, ConstructorOrAbstractConstructor } from "@aedart/contracts";
import Concern from "./Concern";
import Configuration from "./Configuration";
import Container from "./Container";

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
     * Inject one or more concerns into the target class and return the modified target.
     * 
     * **Note**: _This method performs the following (in given order):_
     * 
     * _**A**: Defines a new concerns {@link Container} in target class' prototype, via {@link defineContainer}._
     * 
     * _**B**: Defines aliases (proxy properties and methods) in target class' prototype, via {@link defineAliases}._
     * 
     * @template T extends {@link ConstructorOrAbstractConstructor} = object
     * @template C = {@link Concern}
     * 
     * @param {T} target The target class concerns must be injected into
     * @param {...Constructor<C>|Configuration<C>} concerns
     * 
     * @return {T} Given target class with concern classes injected into its prototype
     * 
     * @throws {TypeError|Error}
     */
    inject<
        T extends ConstructorOrAbstractConstructor = object,
        C = Concern
    >(target: T, ...concerns: Constructor<C>|Configuration<C>): T;

    /**
     * Defines a concerns {@link Container} in target class' prototype using
     * [CONCERNS]{@link import('@aedart/contracts/support/concerns').CONCERNS} as its property key.
     * 
     * **Note**: _If target class has a parent that already has a container defined, then the
     * concern classes it contains will be merged with those provided as argument for this method,
     * and populated into the new container._
     * 
     * @param {object} target The target class in which a concerns container must be defined
     * @param {Constructor<Concern>[]} concerns The concern classes to populate the container with.
     *
     * @return {Container}
     * 
     * @throws {TypeError} If duplicate concern classes are provided, or if provided concern classes are already
     *                     defined in target class' parent.
     * @throws {Error} If unable to define concerns container in target class.
     */
    defineContainer(target: object, concerns: Constructor<Concern>[]): Container;
    
    /**
     * Create aliases (proxy properties and methods) in target class' prototype, to the properties
     * or methods in given concerns.
     * 
     * **Note**: _Method creates each alias using the {@link defineAlias} method!_
     * 
     * @param {object} target The target class aliases must be created in
     * @param {Configuration<Concern>[]} configurations List of concern injection configurations
     *
     * @throws {TypeError} In case of conflicting aliases.
     * @throws {Error} If unable to obtain keys from source concern or failure occurs when defining
     *                 proxy properties or methods in target class' prototype.
     */
    defineAliases(target: object, configurations: Configuration<Concern>[]): void;

    /**
     * Create an alias (a proxy) in target class' prototype, to a property or method in given concern.
     * 
     * **Note**: _Method will do nothing if a property or method already exists in the target, with the same
     * name as the given alias!_
     * 
     * @param {object} target The target class the alias must be created in
     * @param {PropertyKey} key Name of the property or method in the source concern class to create an alias for
     * @param {PropertyKey} alias Alias for the key to create in the target class (the proxy property or method)
     * @param {Constructor<Concern>} source The concern to that the alias property or method must proxy to 
     *
     * @return {boolean} True if a proxy property or method was created in target class.
     *                   False if not, e.g. property or method with same name or symbol as the alias
     *                   already exists in target. 
     * 
     * @throws {Error} If unable to obtain key from source concern or failure occurs when defining
     *                 proxy property or method in target class' prototype.
     */
    defineAlias(
        target: object,
        key: PropertyKey,
        alias: PropertyKey,
        source: Constructor<Concern>
    ): boolean;
}