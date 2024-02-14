import { Constructor, ConstructorOrAbstractConstructor } from "@aedart/contracts";
import Concern from "./Concern";
import Configuration from "./Configuration";

/**
 * Concerns Injector
 * 
 * Able to inject concerns into a target class and create alias (proxy) properties 
 * and methods to the provided concerns' properties and methods, in the target class.
 * 
 * @see {Concern}
 */
export default interface Injector<T extends ConstructorOrAbstractConstructor = object>
{
    /**
     * Returns the target class that concerns must be injected into
     * 
     * @return {ConstructorOrAbstractConstructor}
     */
    get target(): T;

    /**
     * Inject one or more concerns into the target class and return the modified target
     * 
     * TODO: Details description what this method must and MUST NOT do...
     * TODO: E.g. define a "CONCERNS" property / map / method in target class' prototype (with inherited concerns from parent classes?)
     * TODO: E.g. must prevent duplicate concern injection target (full inheritance chain)
     * TODO: E.g. must prevent name conflicts in aliases
     * 
     * @template C = {@link Concern}
     * 
     * @param {...Constructor<C>|Configuration<C>} concerns
     * 
     * @return {ConstructorOrAbstractConstructor}
     * 
     * @throws {Error} If unable to inject concerns into target class
     */
    inject<C = Concern>(...concerns: Constructor<C>|Configuration<C>): T;
    
    /**
     * Create aliases (a proxies) in target class, to the properties or methods in given concern
     * 
     * **Note**: _Method creates each alias using the {@link createAlias} method!_
     * 
     * @param {Configuration<Concern>} config The concern injection configuration
     *
     * @throws {Error} If unable to obtain keys from source concern or failure occurs when defining
     *                 proxy properties or methods in target class
     */
    createAliases(config: Configuration<Concern>): void;

    /**
     * Create an alias (a proxy) in target class, to a property or method in given concern
     * 
     * **Note**: _Method will do nothing if a property or method exists in the target, with the same name
     * as the given alias!_
     * 
     * @param {PropertyKey} key Name of the property or method in the source concern class to create alias for
     * @param {PropertyKey} alias Alias for the key to create in the target class (the proxy property or method)
     * @param {Constructor<Concern>} source The concern to that the alias property or method must proxy to 
     *
     * @return {boolean} True if a proxy property or method was created in target class.
     *                   False if not, e.g. property or method with same name or symbol as the alias
     *                   already exists in target. 
     * 
     * @throws {Error} If unable to obtain key from source concern or failure occurs when defining
     *                 proxy property or method in target
     */
    createAlias(key: PropertyKey, alias: PropertyKey, source: Constructor<Concern>): boolean;
}