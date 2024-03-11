import type { ConstructorLike } from "@aedart/contracts";
import ConcernConstructor from './ConcernConstructor';
import UsesConcerns from './UsesConcerns';

/**
 * Descriptors Repository
 * 
 * Utility for obtaining property descriptors for a target class or concern.
 */
export default interface DescriptorsRepository
{
    /**
     * Returns property descriptors for given target class (recursively)
     *
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {boolean} [force=false] If `true` then method will not return evt. cached descriptors.
     * @param {boolean} [cache=false] Caches the descriptors if `true`.
     *
     * @returns {Record<PropertyKey, PropertyDescriptor>}
     */
    get(
        target: ConstructorLike | UsesConcerns | ConcernConstructor,
        force?: boolean,
        cache?: boolean
    ): Record<PropertyKey, PropertyDescriptor>;
    
    /**
     * Caches property descriptors for target during the execution of callback.
     *
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {() => any} callback Callback to invoke
     * @param {boolean} [forgetAfter=true] It `true`, cached descriptors are deleted after callback is invoked
     * 
     * @return {any}
     */
    rememberDuring(
        target: ConstructorLike | UsesConcerns | ConcernConstructor,
        callback: () => any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        forgetAfter?: boolean
    ): any /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * Retrieves the property descriptors for given target and caches them
     *
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target The target class, or concern class
     * @param {boolean} [force=false] If `true` then evt. previous cached result is not used.
     *
     * @returns {Record<PropertyKey, PropertyDescriptor>}
     */
    remember(target: ConstructorLike | UsesConcerns | ConcernConstructor, force?: boolean): Record<PropertyKey, PropertyDescriptor>;

    /**
     * Deletes cached descriptors for target
     *
     * @param {ConstructorLike | UsesConcerns | ConcernConstructor} target
     *
     * @return {boolean}
     */
    forget(target: ConstructorLike | UsesConcerns | ConcernConstructor): boolean;

    /**
     * Clears all cached descriptors
     *
     * @return {this}
     */
    clear(): this
}