import Concern from "./Concern";
import ConcernConstructor from "./ConcernConstructor";
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
 * @template T extends Concern = Concern
 * 
 * @see {Concern}
 * @see {Aliases}
 */
export default interface Configuration<T extends Concern = Concern>
{
    /**
     * The Concern Class that must be injected into a target class
     * 
     * @template T extends Concern = Concern
     * 
     * @type {ConcernConstructor<T>}
     */
    concern: ConcernConstructor<T>;

    /**
     * Aliases for Concern's properties or methods.
     * 
     * **Note**: _Defaults to same property and method names as "aliases", as those defined by
     * a concern class' [PROVIDES]{@link import('@aedart/contracts/support/concerns').PROVIDES},
     * if this property is empty or `undefined`._
     * 
     * @template T extends Concern = Concern
     * 
     * @type {Aliases<T>|undefined}
     */
    aliases?: Aliases<T>;

    /**
     * Flag that indicates whether an "injector" is allowed to create
     * "aliases" (proxy) properties and methods into a target class's prototype.
     * 
     * **Note**: _Defaults to `true` if this property is `undefined`._
     * 
     * **Note**: _If set to `false`, then {@link aliases} are ignored._
     * 
     * @type {boolean}
     */
    allowAliases?: boolean;
}