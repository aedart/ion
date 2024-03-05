import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import type { ConcernConstructor, UsesConcerns, DescriptorsRepository } from "@aedart/contracts/support/concerns";
import { getClassPropertyDescriptors } from "@aedart/support/reflections";

/**
 * Repository
 * 
 * @see DescriptorsRepository
 */
export default class Repository implements DescriptorsRepository
{
    /**
     * In-memory cache property descriptors for target class and concern classes
     *
     * @type {WeakMap<ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor, Record<PropertyKey, PropertyDescriptor>>}
     *
     * @private
     */
    #store: WeakMap<
        ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor,
        Record<PropertyKey, PropertyDescriptor>
    >;

    /**
     * Create new Descriptors instance
     */
    constructor() {
        this.#store = new WeakMap();
    }

    /**
     * Returns property descriptors for given target class (recursively)
     *
     * @param {ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {boolean} [force=false] If `true` then method will not return evt. cached descriptors.
     * @param {boolean} [cache=false] Caches the descriptors if `true`.
     *
     * @returns {Record<PropertyKey, PropertyDescriptor>}
     */
    public get(
        target: ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor,
        force: boolean = false,
        cache: boolean = false
    ): Record<PropertyKey, PropertyDescriptor>
    {
        if (!force && this.#store.has(target)) {
            return this.#store.get(target) as Record<PropertyKey, PropertyDescriptor>;
        }

        const descriptors = getClassPropertyDescriptors(target, true);
        if (cache) {
            this.#store.set(target, descriptors);
        }

        return descriptors;
    }
    
    /**
     * Caches property descriptors for target during the execution of callback.
     *
     * @param {ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {() => any} callback Callback to invoke
     * @param {boolean} [forgetAfter=true] It `true`, cached descriptors are deleted after callback is invoked
     */
    public rememberDuring(
        target: ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor,
        callback: () => any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        forgetAfter: boolean = true
    ): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        this.remember(target);

        const output = callback();

        if (forgetAfter) {
            this.forget(target);
        }
        
        return output;
    }
    
    /**
     * Retrieves the property descriptors for given target and caches them
     * 
     * @param {ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {boolean} [force=false] If `true` then evt. previous cached result is not used.
     *
     * @returns {Record<PropertyKey, PropertyDescriptor>}
     */
    public remember(target: ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor, force: boolean = false): Record<PropertyKey, PropertyDescriptor>
    {
        return this.get(target, force, true);
    }
    
    /**
     * Deletes cached descriptors for target
     * 
     * @param {ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor} target
     * 
     * @return {boolean}
     */
    public forget(target: ConstructorOrAbstractConstructor | UsesConcerns | ConcernConstructor): boolean
    {
        return this.#store.delete(target);
    }
    
    /**
     * Clears all cached descriptors
     * 
     * @return {this}
     */
    public clear(): this
    {
        this.#store = new WeakMap();
        
        return this;
    }
}