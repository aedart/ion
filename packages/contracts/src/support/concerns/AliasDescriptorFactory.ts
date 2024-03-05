import ConcernConstructor from './ConcernConstructor';

/**
 * Alias Descriptor Factory
 */
export default interface AliasDescriptorFactory
{
    /**
     * Makes a property descriptor to be used for an "alias" (proxy) property or method
     * 
     * @param {PropertyKey} key The property key in `source` concern
     * @param {ConcernConstructor} source The concern that holds the property key
     * @param {PropertyDescriptor} keyDescriptor Descriptor of `key` in `source` concern
     *
     * @returns {PropertyDescriptor} Descriptor to be used for defining alias in a target class
     */
    make(key: PropertyKey, source: ConcernConstructor, keyDescriptor: PropertyDescriptor): PropertyDescriptor;
}