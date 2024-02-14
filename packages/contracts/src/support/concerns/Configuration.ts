import type { Constructor } from "@aedart/contracts";
import Concern from "./Concern";
import type {
    Aliases 
} from "./types";

/**
 * Concern Injection Configuration
 * 
 * Defines the Concern class that must be injected into a target class,
 * along with other aspects of the injection, such as what aliases to use
 * and what properties or methods should not be aliased.
 * 
 * @see {Concern}
 * @see {Aliases}
 */
export default interface Configuration<T extends Concern>
{
    /**
     * The Concern Class that must be injected into a target class
     * 
     * @type {Constructor<Concern>}
     */
    concern: Constructor<T>;

    /**
     * Aliases for Concern's properties or methods.
     * 
     * **Note**: _An "injector" must always default to the same property and
     * method names as those defined in the Concern Class, if a given property or
     * method is not specified here._
     * 
     * @type {Aliases<Concern>|undefined}
     */
    aliases?: Aliases<T>;

    /**
     * Properties and methods that MUST NOT be aliased into a target class.
     * 
     * **Note**: _Defaults to list provided by the Concern Class' [HIDDEN]{@link import('@aedart/contracts/support/concerns').HIDDEN},
     * if not specified here._
     * 
     * **Note**: _Properties and methods that are defined in [ALWAYS_HIDDEN]{@link import('@aedart/contracts/support/concerns').ALWAYS_HIDDEN}
     * will always be hidden, regardless of those defined here._
     * 
     * @type {PropertyKey[]|undefined}
     */
    hidden?: PropertyKey[];

    /**
     * Flag that indicates whether an "injector" is allowed to create
     * "aliases" (proxy) properties and methods into a target class's prototype.
     * 
     * If set to `false`, then {@link aliases} and {@link hidden} settings
     * are ignored.
     * 
     * @type {boolean}
     */
    allowAliases: boolean;
}