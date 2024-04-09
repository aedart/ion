import type { ConstructorLike } from "@aedart/contracts";
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
     * @type {WeakMap<ConstructorLike | UsesConcerns | ConcernConstructor, Record<PropertyKey, PropertyDescriptor>>}
     *
     * @protected
     */
    protected _store: WeakMap<
        ConstructorLike | UsesConcerns | ConcernConstructor,
        Record<PropertyKey, PropertyDescriptor>
    >;

    /**
     * Create new Descriptors instance
     */
    constructor() {
        this._store = new WeakMap();
    }

    /**
     * Returns property descriptors for given target class (recursively)
     *
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {boolean} [force=false] If `true` then method will not return evt. cached descriptors.
     * @param {boolean} [cache=false] Caches the descriptors if `true`.
     *
     * @returns {Record<PropertyKey, PropertyDescriptor>}
     */
    public get(
        target: ConstructorLike | UsesConcerns | ConcernConstructor,
        force: boolean = false,
        cache: boolean = false
    ): Record<PropertyKey, PropertyDescriptor>
    {
        if (!force && this._store.has(target)) {
            return this._store.get(target) as Record<PropertyKey, PropertyDescriptor>;
        }

        const descriptors = getClassPropertyDescriptors(target, true);
        if (cache) {
            this._store.set(target, descriptors);
        }

        return descriptors;
    }
    
    /**
     * Caches property descriptors for target during the execution of callback.
     *
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {() => any} callback Callback to invoke
     * @param {boolean} [forgetAfter=true] It `true`, cached descriptors are deleted after callback is invoked
     */
    public rememberDuring(
        target: ConstructorLike | UsesConcerns | ConcernConstructor,
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
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {boolean} [force=false] If `true` then evt. previous cached result is not used.
     *
     * @returns {Record<PropertyKey, PropertyDescriptor>}
     */
    public remember(target: ConstructorLike | UsesConcerns | ConcernConstructor, force: boolean = false): Record<PropertyKey, PropertyDescriptor>
    {
        return this.get(target, force, true);
    }
    
    /**
     * Deletes cached descriptors for target
     * 
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target
     * 
     * @return {boolean}
     */
    public forget(target: ConstructorLike | UsesConcerns | ConcernConstructor): boolean
    {
        return this._store.delete(target);
    }
    
    /**
     * Clears all cached descriptors
     * 
     * @return {this}
     */
    public clear(): this
    {
        this._store = new WeakMap();
        
        return this;
    }
}