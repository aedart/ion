import type {
    Resolver,
    ConcernConstructor,
    Owner
} from "@aedart/contracts/support/concerns";
import { CONCERNS } from "@aedart/contracts/support/concerns";

/**
 * Proxy Descriptor Resolver
 * 
 * @see Resolver
 */
export default class ProxyResolver implements Resolver
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
    resolve(key: PropertyKey, source: ConcernConstructor, keyDescriptor: PropertyDescriptor): PropertyDescriptor
    {
        const proxy: PropertyDescriptor = Object.assign(Object.create(null), {
            configurable: keyDescriptor.configurable,
            enumerable: keyDescriptor.enumerable,
            // writable: keyDescriptor.writable // Do not specify here...            
        });

        // A descriptor can only have an accessor, a value or writable attribute. Depending on the "value"
        // a different kind of proxy must be defined.
        const hasValue: boolean = Reflect.has(keyDescriptor, 'value');

        if (hasValue && typeof keyDescriptor.value == 'function') {
            proxy.value = this.makeMethodProxy(key, source);
        } else if (hasValue) {
            // When value is not a function, it could be a readonly property...
            proxy.get = this.makeGetPropertyProxy(key, source);

            // However, if the descriptor claims that its writable, then
            // a setter must be defined too.
            if (keyDescriptor.writable) {
                proxy.set = this.makeSetPropertyProxy(key, source);
            }
        } else {
            // Otherwise, the property can a getter and or a setter...
            if (Reflect.has(keyDescriptor, 'get')) {
                proxy.get = this.makeGetPropertyProxy(key, source);
            }

            if (Reflect.has(keyDescriptor, 'set')) {
                proxy.set = this.makeSetPropertyProxy(key, source);
            }
        }

        return proxy;
    }

    /**
     * Returns a new proxy "method" for given method in this concern
     *
     * @param {PropertyKey} method
     * @param {ConcernConstructor} concern
     *
     * @returns {(...args: any[]) => any}
     *
     * @protected
     */
    protected makeMethodProxy(method: PropertyKey, concern: ConcernConstructor)
    {
        return function(
            ...args: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        {
            // @ts-expect-error This = concern instance
            return (this as Owner)[CONCERNS].call(concern, method, ...args);
        }
    }

    /**
     * Returns a new proxy "get" for given property in this concern
     *
     * @param {PropertyKey} property
     * @param {ConcernConstructor} concern
     *
     * @returns {() => any}
     *
     * @protected
     */
    protected makeGetPropertyProxy(property: PropertyKey, concern: ConcernConstructor)
    {
        return function(): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        {
            // @ts-expect-error This = concern instance
            return (this as Owner)[CONCERNS].getProperty(concern, property);
        }
    }

    /**
     * Returns a new proxy "set" for given property in this concern
     *
     * @param {PropertyKey} property
     * @param {ConcernConstructor} concern
     *
     * @returns {(value: any) => void}
     *
     * @protected
     */
    protected makeSetPropertyProxy(property: PropertyKey, concern: ConcernConstructor)
    {
        return function(
            value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ): void
        {
            // @ts-expect-error This = concern instance
            (this as Owner)[CONCERNS].setProperty(concern, property, value);
        }
    }
}