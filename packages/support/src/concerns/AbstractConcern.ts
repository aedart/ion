import type { Concern, UsesConcerns } from "@aedart/contracts/support/concerns";
import { PROVIDES, BEFORE, AFTER } from "@aedart/contracts/support/concerns";
import { AbstractClassError } from "@aedart/support/exceptions";
import { classOwnKeys } from "@aedart/support/reflections";

/**
 * Abstract Concern
 * 
 * @see {Concern}
 * @see [ConcernConstructor]{@link import('@aedart/contracts/support/concerns').ConcernConstructor}
 * @see [RegistrationAware]{@link import('@aedart/contracts/support/concerns').RegistrationAware}
 * 
 * @implements {Concern}
 * 
 * @abstract
 */
export default abstract class AbstractConcern implements Concern
{
    /**
     * The owner class instance this concern is injected into,
     * or `this` concern instance.
     * 
     * @type {object}
     *
     * @readonly
     * @protected
     */
    protected readonly _concernOwner: object;

    /**
     * Creates a new concern instance
     *
     * @param {object} [owner] The owner class instance this concern is injected into.
     *                         Defaults to `this` concern instance if none given.
     *
     * @throws {Error} When concern is unable to preform initialisation, e.g. caused
     *                 by the owner or other circumstances.
     */
    public constructor(owner?: object)
    {
        if (new.target === AbstractConcern) {
            throw new AbstractClassError(AbstractConcern);
        }
        
        this._concernOwner = owner || this;
    }

    /**
     * The owner class instance this concern is injected into,
     * or `this` concern instance if no owner was set.
     *
     * @readonly
     * 
     * @type {object}
     */
    public get concernOwner(): object
    {
        return this._concernOwner;
    }

    /**
     * Returns list of property keys that this concern class offers.
     *
     * **Note**: _Only properties and methods returned by this method can be aliased
     * into a target class._
     *
     * @static
     *
     * @return {PropertyKey[]}
     */
    public static [PROVIDES](): PropertyKey[]
    {
        // Feel free to overwrite this static method in your concern class and specify
        // the properties and methods that your concern offers (those that can be aliased).
        
        return classOwnKeys(this, true);
    }

    /**
     * Perform pre-registration logic.
     *
     * **Note**: _This hook method is intended to be invoked by an
     * [Injector]{@link import('@aedart/contracts/support/concerns').Injector}, before
     * the concern container and aliases are defined in the target class._
     *
     * @static
     *
     * @param {UsesConcerns} target Target class constructor
     *
     * @return {void}
     *
     * @throws {Error}
     */
    static [BEFORE](
        target: UsesConcerns /* eslint-disable-line @typescript-eslint/no-unused-vars */
    ): void
    {
        // Overwrite this method to perform pre-registration logic. This can be used, amongst other things,
        // to prevent your concern class from being used, e.g.:
        //  - If your concern class is specialised and only supports specific kinds of target classes.
        //  - If your concern will conflict if combined with another concern class (use target[CONCERN_CLASSES] for such).
        //  - ...etc
    }

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
    static [AFTER](
        target: UsesConcerns /* eslint-disable-line @typescript-eslint/no-unused-vars */
    ): void
    {
        // Overwrite this method to perform post-registration logic. This can be used in situations
        // when you need to perform additional setup or configuration on the concern class level (static),
        // e.g.:
        //  - Prepare specialised caching mechanisms, with or for the target class.
        //  - Obtain other kinds static resources or meta information that must be used by the target or
        //    concern, that otherwise cannot be done during concern class' constructor. 
        //  - ...etc
    }
}