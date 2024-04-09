import { Constructor } from "@aedart/contracts";
import { FactoryCallback, Identifier } from "./types";

/**
 * Binding Entry
 * 
 * @template T = any
 */
export default interface Binding<
    T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> {
    /**
     * This binding's identifier
     *
     * @type {Identifier}
     *
     * @readonly
     */
    readonly identifier: Identifier;

    /**
     * The bound value to be resolved by a service container
     *
     * @template T = any
     * 
     * @type {FactoryCallback<T> | Constructor<T>}
     *
     * @readonly
     */
    readonly value: FactoryCallback<T> | Constructor<T>;

    /**
     * Shared state of resolved value
     * 
     * @type {boolean} If `true`, then service container must register resolved
     *                 value as a singleton.
     *
     * @readonly
     */
    readonly shared: boolean;
    
    /**
     * Determine if bound value is a {@link FactoryCallback}
     * 
     * @returns {boolean}
     */
    isFactoryCallback(): boolean;

    /**
     * Determine if bound value is a {@link Constructor}
     * 
     * @returns {boolean}
     */
    isConstructor(): boolean;
}