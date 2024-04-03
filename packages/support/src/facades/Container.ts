import type { Identifier, Container as ServiceContainer } from "@aedart/contracts/container";
import { CONTAINER } from "@aedart/contracts/container";
import Facade from "./Facade";

/**
 * Container Facade
 * 
 * @extends Facade
 */
export default class Container extends Facade
{
    public static getIdentifier(): Identifier
    {
        return CONTAINER;
    }

    public static obtain()
    {
        return this.resolve<ServiceContainer>(this.getIdentifier());
    }
}