import ConcernConstructor from './ConcernConstructor';

/**
 * Proxy Descriptor Resolver
 */
export default interface Resolver
{
    /**
     * Returns a property descriptor to be used for an "alias" property or method in a target class
     * 
     * @param {PropertyKey} key The property key in `source` concern
     * @param {ConcernConstructor} source The concern that holds the property key
     * @param {PropertyDescriptor} keyDescriptor Descriptor of `key` in `source`
     *
     * @returns {PropertyDescriptor} Descriptor to be used for defining alias in a target class
     */
    resolve(key: PropertyKey, source: ConcernConstructor, keyDescriptor: PropertyDescriptor): PropertyDescriptor;
}