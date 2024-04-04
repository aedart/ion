import type { Identifier, Container as ServiceContainer } from "@aedart/contracts/container";
import { CONTAINER } from "@aedart/contracts/container";
import Facade from "./Facade";

/**
 * Container Facade
 */
export default class Container extends Facade
{
    public static getIdentifier(): Identifier
    {
        return CONTAINER;
    }

    /**
     * @inheritDoc
     * 
     * @return {import('@aedart/contracts/container').Container}
     */
    public static obtain()
    {
        return this.resolveIdentifier<ServiceContainer>();
    }
}