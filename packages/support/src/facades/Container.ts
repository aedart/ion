import type { Identifier, Container as ServiceContainer } from "@aedart/contracts/container";
import { CONTAINER } from "@aedart/contracts/container";
import Facade from "./Facade";

/**
 * Container Facade
 */
export default class Container extends Facade
{
    /**
     * The "type" of the resolved object instance.
     *
     * **Note**: _This property is not used for anything other
     * than to provide a TypeScript return type for the `obtain()`
     * method._
     *
     * @type {ServiceContainer}
     * 
     * @protected
     * @static
     */
    protected static type: ServiceContainer;

    /**
     * Returns identifier to be used for resolving facade's underlying object instance
     *
     * @return {Identifier}
     *
     * @abstract
     *
     * @static
     */
    public static getIdentifier(): Identifier
    {
        return CONTAINER;
    }
}