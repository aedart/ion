import { BEFORE, AFTER } from "./index";
import UsesConcerns from "./UsesConcerns";

/**
 * Registration Aware
 * 
 * Concern class is aware of when it is being registered by a target class
 * and performs pre-/post-registration logic.
 */
export default interface RegistrationAware
{
    /**
     * Perform pre-registration logic.
     *
     * **Note**: _This hook method is intended to be invoked by an
     * [Injector]{@link import('@aedart/contracts/support/concerns').Injector}, before
     * a concern container is and aliases are defined in the target class._
     *
     * @static
     *
     * @param {UsesConcerns} target Target class constructor
     *
     * @return {void}
     *
     * @throws {Error}
     */
    [BEFORE](target: UsesConcerns): void;
    
    /**
     * Perform post-registration logic.
     * 
     * **Note**: _This hook method is intended to be invoked by an
     * [Injector]{@link import('@aedart/contracts/support/concerns').Injector}, after
     * this concern class has been registered in a target class and aliases have been
     * defined in target's prototype._
     * 
     * @static 
     *
     * @param {UsesConcerns} target Target class constructor, after concerns and aliases defined
     * 
     * @return {void}
     * 
     * @throws {Error}
     */
    [AFTER](target: UsesConcerns): void;
}